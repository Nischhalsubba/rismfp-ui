/** Minimum zoom level supported by the architecture map. */
const MIN_SCALE = 0.55;

/** Maximum zoom level supported by the architecture map. */
const MAX_SCALE = 2.2;

/** Amount used by toolbar and keyboard zoom controls. */
const SCALE_STEP = 0.15;

/** Number of screen pixels moved by one keyboard pan action. */
const PAN_STEP = 42;

/**
 * Limits a numeric value to an inclusive range.
 * @param {number} value Value to constrain.
 * @param {number} minimum Smallest allowed value.
 * @param {number} maximum Largest allowed value.
 * @returns {number} Constrained value.
 */
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

/**
 * Returns a readable label for a diagram node.
 * @param {Element} node SVG node element.
 * @returns {string} Accessible node label.
 */
function getNodeLabel(node) {
  return node.getAttribute('aria-label') || 'Diagram node';
}

/**
 * Creates one interactive viewport controller.
 * @param {HTMLElement} root Flowchart root element.
 */
function initialiseFlowchart(root) {
  const viewport = root.querySelector('[data-flowchart-viewport]');
  const scene = root.querySelector('[data-flowchart-scene]');
  const zoomOutput = root.querySelector('[data-flowchart-zoom]');
  const status = root.querySelector('[data-flowchart-status]');
  const controls = [...root.querySelectorAll('[data-flowchart-action]')];
  const nodes = [...root.querySelectorAll('.flowchart-node')];

  if (!(viewport instanceof HTMLElement) || !(scene instanceof SVGGElement)) return;

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let dragStartX = 0;
  let dragStartY = 0;

  /** Applies the current pan and zoom values to the SVG scene. */
  function renderTransform() {
    scene.setAttribute('transform', `translate(${translateX} ${translateY}) scale(${scale})`);
    if (zoomOutput instanceof HTMLOutputElement) {
      zoomOutput.value = `${Math.round(scale * 100)}%`;
    }
  }

  /**
   * Announces an interaction result to assistive technology.
   * @param {string} message Message to display and announce.
   */
  function announce(message) {
    if (status instanceof HTMLElement) status.textContent = message;
  }

  /** Restores the original centred map state. */
  function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    renderTransform();
    announce('Diagram reset to 100%. Drag to pan or scroll to zoom.');
  }

  /**
   * Changes zoom while preserving a selected screen-space focal point.
   * @param {number} nextScale Requested zoom level.
   * @param {number} focalX Horizontal focal coordinate within the viewport.
   * @param {number} focalY Vertical focal coordinate within the viewport.
   */
  function setScale(nextScale, focalX = viewport.clientWidth / 2, focalY = viewport.clientHeight / 2) {
    const boundedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    const ratio = boundedScale / scale;
    translateX = focalX - (focalX - translateX) * ratio;
    translateY = focalY - (focalY - translateY) * ratio;
    scale = boundedScale;
    renderTransform();
    announce(`Diagram zoom ${Math.round(scale * 100)}%.`);
  }

  /**
   * Moves the diagram by a screen-space offset.
   * @param {number} deltaX Horizontal movement.
   * @param {number} deltaY Vertical movement.
   */
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

  /**
   * Highlights one node and clears the previous node selection.
   * @param {Element} selectedNode Node being focused.
   */
  function selectNode(selectedNode) {
    nodes.forEach((node) => node.toggleAttribute('data-selected', node === selectedNode));
    announce(getNodeLabel(selectedNode));
  }

  /** Handles toolbar button actions. */
  function handleControlClick(event) {
    const control = event.currentTarget;
    if (!(control instanceof HTMLButtonElement)) return;

    const action = control.dataset.flowchartAction;
    if (action === 'zoom-in') setScale(scale + SCALE_STEP);
    if (action === 'zoom-out') setScale(scale - SCALE_STEP);
    if (action === 'reset') resetView();
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

  /** Zooms toward the cursor or touchpad position using the wheel. */
  function handleWheel(event) {
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
    if (key === '0') resetView();
  }

  controls.forEach((control) => control.addEventListener('click', handleControlClick));
  viewport.addEventListener('pointerdown', handlePointerDown);
  viewport.addEventListener('pointermove', handlePointerMove);
  viewport.addEventListener('pointerup', handlePointerEnd);
  viewport.addEventListener('pointercancel', handlePointerEnd);
  viewport.addEventListener('wheel', handleWheel, { passive: false });
  viewport.addEventListener('keydown', handleKeydown);

  nodes.forEach((node) => {
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
    if (fullscreenButton instanceof HTMLButtonElement) {
      fullscreenButton.textContent = document.fullscreenElement === root ? 'Exit fullscreen' : 'Fullscreen';
    }
  });

  resetView();
}

/** Initialises every interactive architecture map on the current page. */
function initialiseFlowcharts() {
  document.querySelectorAll('[data-flowchart]').forEach((root) => {
    if (root instanceof HTMLElement) initialiseFlowchart(root);
  });
}

initialiseFlowcharts();
