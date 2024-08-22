document.addEventListener('DOMContentLoaded', function() {
    // Function to handle touch events
    function handleTouch(e) {
        if (e.target.classList.contains('hover-element')) {
            e.preventDefault();
            const wasActive = e.target.classList.contains('touch-active');
            
            // Remove active class from all elements
            document.querySelectorAll('.hover-element').forEach(el => {
                el.classList.remove('touch-active');
            });

            // Toggle active class on the touched element
            if (!wasActive) {
                e.target.classList.add('touch-active');
            }
        } else if (!e.target.closest('.hover-element')) {
            // Remove active class from all elements if touching outside
            document.querySelectorAll('.hover-element').forEach(el => {
                el.classList.remove('touch-active');
            });
        }
    }

    // Add touch event listener to the document
    document.addEventListener('touchstart', handleTouch);
});
