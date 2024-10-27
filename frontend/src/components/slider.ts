export function createSlider(min: number, max: number, step: number): HTMLInputElement {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min.toString();
    slider.max = max.toString();
    slider.step = step.toString();
    return slider;
  }
  