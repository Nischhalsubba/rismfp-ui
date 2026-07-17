/** Minimum zoom level supported by the architecture map. */
const MIN_SCALE = 0.35;

/** Maximum zoom level supported by the architecture map. */
const MAX_SCALE = 2.2;

/** Amount used by toolbar and keyboard zoom controls. */
const SCALE_STEP = 0.15;

/** Number of screen pixels moved by one keyboard pan action. */
const PAN_STEP = 42;

/** Limits a numeric value to an inclusive range. */
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

/** Returns a readable label for a diagram node. */
function getNodeLabel(node) {
  return node.getAttribute('aria-label') || 'Diagram node';
}

/** Creates one interactive viewport controller. */
function initialiseFlowchart(root) {
  const viewport = root.querySelector('[data-flowchart-viewport]');
  const canvas = root.querySelector('.flowchart__canvas');
  const scene = root.querySelector('[data-flowchart-scene]');
  const zoomOutput = root.querySelector('[data-flowchart-zoom]');
  const status = root.querySelector('[data-flowchart-status]');
  const controls = [...root.querySelectorAll('[data-flowchart-action]')];
  const nodes = [...root.querySelectorAll('.flowchart-node')];

  if (!(viewport instanceof HTMLElement) || !(canvas instanceof SVGSVGElement) || !(scene instanceof SVGGElement)) return;

  const viewBox = canvas.viewBox.baseVal;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let dragStartX = 0;
  let dragStartY = 0;

  /** Announces an interaction result to assistive technology. */
  function announce(message) {
    if (status instanceof HTMLElement) status.textContent = message;
  }

  /** Returns the smallest scale that keeps the complete map visible. */
  function getFitScale() {
    const horizontal = viewport.clientWidth / viewBox.width;
    const vertical = viewport.clientHeight / viewBox.height;
    return clamp(Math.min(horizontal, vertical) * 0.94, MIN_SCALE, 1);
  }

  /** Keeps enough of the map visible to prevent users losing it off-screen. */
  function constrainTranslation() {
    const scaledWidth = viewBox.width * scale;
    const scaledHeight = viewBox.height * scale;
    const margin = Math.min(120, viewport.clientWidth * 0.2);

    if (scaledWidth <= viewport.clientWidth) translateX = (viewport.clientWidth - scaledWidth) / 2;
    else translateX = clamp(translateX, viewport.clientWidth - scaledWidth - margin, margin);

    if (scaledHeight <= viewport.clientHeight) translateY = (viewport.clientHeight - scaledHeight) / 2;
    else translateY = clamp(translateY, viewport.clientHeight - scaledHeight - margin, margin);
  }

  /** Applies the current pan and zoom values to the SVG scene. */
  function renderTransform() {
    constrainTranslation();
    scene.setAttribute('transform', `translate(${translateX} ${translateY}) scale(${scale})`);
    if (zoomOutput instanceof HTMLOutputElement) zoomOutput.value = `${Math.round(scale * 100)}%`;
  }

  /** Fits the complete diagram inside the current viewport. */
  function fitView() {
    scale = getFitScale();
    translateX = (viewport.clientWidth - viewBox.width * scale) / 2;
    translateY = (viewport.clientHeight - viewBox.height * scale) / 2;
    renderTransform();
    announce(`Diagram fitted to the viewport at ${Math.round(scale * 100)}%.`);
  }

  /** Restores the fit-to-view map state. */
  function resetView() {
    fitView();
  }

  /** Changes zoom while preserving a selected screen-space focal point. */
  function setScale(nextScale, focalX = viewport.clientWidth / 2, focalY = viewport.clientHeight / 2) {
    const boundedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const ratio = boundedScale / scale;
    translateX = focalX - (focalX - translateX) * ratio;
    translateY = focalY - (focalY - translateY) * ratio;
    scale = boundedScale;
    renderTransform();
    announce(`Diagram zoom ${Math.round(scale * 100)}%.`);
  }

  /** Moves the diagram by a screen-space offset. */
  function panBy(deltaX, deltaY) {
    translateX += deltaX;
    translateY += deltaY;
    renderTransform();
  }

  /** Toggles browser fullscreen mode for the flowchart panel. */
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === root) {
        await document.exitFullscreen();
        announce('Exited fullscreen diagram view.');
      } else {
        await root.requestFullscreen();
        announce('Opened fullscreen diagram view.');
      }
    } catch {
      announce('Fullscreen view is not available in this browser.');
    }
  }

  /** Highlights one node and exposes its selected state. */
  function selectNode(selectedNode) {
    nodes.forEach((node) => {
      const selected = node === selectedNode;
      node.toggleAttribute('data-selected', selected);
      node.setAttribute('aria-pressed', String(selected));
    });
    announce(getNodeLabel(selectedNode));
  }

  /** Handles toolbar button actions. */
  function handleControlClick(event) {
    const control = event.currentTarget;
    if (!(control instanceof HTMLButtonElement)) return;
    const action = control.dataset.flowchartAction;
    if (action === 'zoom-in') setScale(scale + SCALE_STEP);
    if (action === 'zoom-out') setScale(scale - SCALE_STEP);
    if (action === 'reset' || action === 'fit') fitView();
    if (action === 'fullscreen') void toggleFullscreen();
  }

  /** Starts pointer dragging when the viewport background is pressed. */
  function handlePointerDown(event) {
    if (!(event instanceof PointerEvent) || event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest('.flowchart-node')) return;
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    dragStartX = translateX;
    dragStartY = translateY;
    viewport.setPointerCapture(pointerId);
    viewport.toggleAttribute('data-dragging', true);
  }

  /** Updates map position while a captured pointer moves. */
  function handlePointerMove(event) {
    if (!(event instanceof PointerEvent) || event.pointerId !== pointerId) return;
    translateX = dragStartX + event.clientX - pointerStartX;
    translateY = dragStartY + event.clientY - pointerStartY;
    renderTransform();
  }

  /** Ends the active pointer drag operation. */
  function handlePointerEnd(event) {
    if (!(event instanceof PointerEvent) || event.pointerId !== pointerId) return;
    pointerId = null;
    viewport.toggleAttribute('data-dragging', false);
    announce('Diagram position updated.');
  }

  /** Zooms only when the user deliberately holds Ctrl or Command. */
  function handleWheel(event) {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const bounds = viewport.getBoundingClientRect();
    const focalX = event.clientX - bounds.left;
    const focalY = event.clientY - bounds.top;
    const direction = event.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setScale(scale + direction, focalX, focalY);
  }

  /** Provides keyboard equivalents for all essential map movement. */
  function handleKeydown(event) {
    const key = event.key;
    const handledKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_', '0'];
    if (!handledKeys.includes(key)) return;
    event.preventDefault();
    if (key === 'ArrowLeft') panBy(PAN_STEP, 0);
    if (key === 'ArrowRight') panBy(-PAN_STEP, 0);
    if (key === 'ArrowUp') panBy(0, PAN_STEP);
    if (key === 'ArrowDown') panBy(0, -PAN_STEP);
    if (key === '+' || key === '=') setScale(scale + SCALE_STEP);
    if (key === '-' || key === '_') setScale(scale - SCALE_STEP);
    if (key === '0') fitView();
  }

  controls.forEach((control) => control.addEventListener('click', handleControlClick));
  viewport.addEventListener('pointerdown', handlePointerDown);
  viewport.addEventListener('pointermove', handlePointerMove);
  viewport.addEventListener('pointerup', handlePointerEnd);
  viewport.addEventListener('pointercancel', handlePointerEnd);
  viewport.addEventListener('wheel', handleWheel, { passive: false });
  viewport.addEventListener('keydown', handleKeydown);

  nodes.forEach((node) => {
    node.setAttribute('aria-pressed', 'false');
    node.addEventListener('click', () => selectNode(node));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectNode(node);
      }
    });
  });

  document.addEventListener('fullscreenchange', () => {
    const fullscreenButton = root.querySelector('[data-flowchart-action="fullscreen"]');
    if (fullscreenButton instanceof HTMLButtonElement) fullscreenButton.textContent = document.fullscreenElement === root ? 'Exit fullscreen' : 'Fullscreen';
    window.requestAnimationFrame(fitView);
  });

  const resizeObserver = new ResizeObserver(() => fitView());
  resizeObserver.observe(viewport);
  resetView();
}

/** Initialises every interactive architecture map on the current page. */
function initialiseFlowcharts() {
  document.querySelectorAll('[data-flowchart]').forEach((root) => {
    if (root instanceof HTMLElement) initialiseFlowchart(root);
  });
}

initialiseFlowcharts();
