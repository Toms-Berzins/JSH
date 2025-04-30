export const scrollToElement = (elementId: string) => {
  // Special handling for hero section - scroll to top
  if (elementId === 'hero' || elementId === 'home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 100; // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}; 