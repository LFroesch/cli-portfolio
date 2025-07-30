// Helper function to get border radius classes based on variant
export const getBorderRadiusClasses = (designVariant) => (size = 'default') => {
  const radiusMap = {
    rounded: {
      default: 'rounded-xl',
      button: 'rounded-lg', 
      small: 'rounded-md',
      card: 'rounded-2xl'
    },
    sharp: {
      default: 'rounded-none',
      button: 'rounded-none',
      small: 'rounded-none', 
      card: 'rounded-none'
    }
  };
  return radiusMap[designVariant]?.[size] || radiusMap[designVariant]?.default || '';
};

// Copy email to clipboard
export const copyEmailToClipboard = async (email) => {
  try {
    await navigator.clipboard.writeText(email);
    // Could add a toast notification here if desired
  } catch (err) {
    console.error('Failed to copy email: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

// Toggle section collapse
export const createToggleSection = (setCollapsedSections) => (sectionKey) => {
  setCollapsedSections(prev => ({
    ...prev,
    [sectionKey]: !prev[sectionKey]
  }));
};