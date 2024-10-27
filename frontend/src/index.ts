import axios from 'axios';
import gsap from 'gsap';

// Get form and elements
const form = document.getElementById('quoteForm') as HTMLFormElement;
const resultDiv = document.getElementById('result') as HTMLElement;
const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

// Animate elements on page load using GSAP
window.onload = () => {
  gsap.from('.form-container', { opacity: 0, y: -50, duration: 1, ease: 'power2.out' });
  gsap.from('#submitBtn', { scale: 0, duration: 1.2, ease: 'back.out(1.7)', delay: 0.5 });
};

// Form submission event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  const planId = (document.getElementById('plan') as HTMLSelectElement).value;
  const age = (document.getElementById('age') as HTMLInputElement).value;
  const coverage = (document.getElementById('coverage') as HTMLInputElement).value;

  // Input validation
  if (!age || !coverage || parseInt(age) <= 0 || parseFloat(coverage) < 1000) {
    resultDiv.innerHTML = `<p class="text-red-500">Please enter valid age and coverage amount.</p>`;
    gsap.fromTo(resultDiv, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    return;
  }

  try {
    // Disable button and show loading spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="loader"></div> Processing...`;

    // Animate button with GSAP
    gsap.to('#submitBtn', { scale: 0.95, duration: 0.2, yoyo: true, repeat: 1 });

    // Send POST request to backend
    const response = await axios.post('http://127.0.0.1:8000/api/calculate-quote/', {
      age: parseInt(age),
      plan_id: parseInt(planId),
      coverage_amount: parseFloat(coverage),
    });

    // Display result and animate with GSAP
    resultDiv.innerHTML = `<p class="text-green-500">Your Quote: $${response.data.quote}</p>`;
    gsap.fromTo(resultDiv, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  } catch (error: any) {
    // Handle errors and animate error message
    resultDiv.innerHTML = `<p class="text-red-500">Error: ${error.response?.data?.error || 'Something went wrong!'}</p>`;
    gsap.fromTo(resultDiv, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  } finally {
    // Re-enable button after processing
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Get Quote';
  }
});
