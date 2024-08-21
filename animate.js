let animationId;

function startBlinkingAnimation() {
    let opacity = 0.7;
    let decreasing = true;

    function animate() {
        // Adjust the opacity
        if (decreasing) {
            opacity -= 0.05;
            if (opacity <= 0) {
                opacity = 0;
                decreasing = false;
            }
        } else {
            opacity += 0.05;
            if (opacity >= 1) {
                opacity = 1;
                decreasing = true;
            }
        }

        // Set the opacity for the arctic2 point layer
        map.setPaintProperty('arctic2-point-layer', 'circle-opacity', opacity);

        // Continue the animation
        animationId = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}

function stopBlinkingAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}