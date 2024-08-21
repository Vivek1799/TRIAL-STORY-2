mapboxgl.accessToken = 'pk.eyJ1Ijoidml2ZWtwYXRpbDE3IiwiYSI6ImNseHV4bzJoMzFycXgybG9tN3ptZXd1d2QifQ.wbdQPBUeYDHlbwnmgHHI9g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vivekpatil17/clzvsorxp003d01o1hxf5553g',
    center: [0, 0], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.on('load', function () {
    // Add the pioneer layer
    map.addSource('pioneer-data', {
        type: 'geojson',
        data: 'finalviz-pioneertanker.geojson' // Ensure this path is correct
    });

    map.addLayer({
        id: 'pioneer-layer',
        type: 'line',
        source: 'pioneer-data',
        layout: {
            'visibility': 'none' // Initially hide the layer
        },
        paint: {
            'line-color': '#75baff', // Blue color for the line
            'line-width': 1.5
        }
    });

    // Add the arctic2 point layer
    map.addSource('arctic2-data', {
        type: 'geojson',
        data: 'arctic2.json' // Ensure this path is correct
    });

    map.addLayer({
        id: 'arctic2-point-layer',
        type: 'circle', // Use 'circle' type for point layers
        source: 'arctic2-data',
        layout: {
            'visibility': 'none' // Initially hide the layer
        },
        paint: {
            'circle-radius': 10, // Size of the point
            'circle-color': '#ff5c5c', // Red color for the point
            'circle-opacity': 1 // Start fully opaque
        }
    });

    // Add the arctic2 label layer
    map.addLayer({
        id: 'arctic2-label-layer',
        type: 'symbol',
        source: 'arctic2-data',
        layout: {
            'visibility': 'none', // Initially hide the layer
            'text-field': 'Arctic 2', // The text to display
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], // Font for the text
            'text-size': 12, // Size of the text
            'text-offset': [0, 1.5], // Offset to position the label near the point
            'text-anchor': 'top' // Position the text above the point
        },
        paint: {
            'text-color': '#d1b494' // Color for the text
        }
    });

    // Add the asya path layer
    map.addSource('asya-path-data', {
        type: 'geojson',
        data: 'asya-path.geojson' // Ensure this path is correct
    });

    map.addLayer({
        id: 'asya-path-layer',
        type: 'line',
        source: 'asya-path-data',
        layout: {
            'visibility': 'none' // Initially hide the layer
        },
        paint: {
            'line-color': '#00cc11', // Coral color for the line
            'line-width': 1.5
        }
    });

    // Initialize Scrollama
    initScrollama();
});

function initScrollama() {
    const scroller = scrollama();

    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(response => {
            const chapter = response.element.id;
            handleStepEnter(chapter);
            response.element.classList.add('active');
        })
        .onStepExit(response => {
            const chapter = response.element.id;
            handleStepExit(chapter);
            response.element.classList.remove('active');
        });

    window.addEventListener('resize', scroller.resize);
}

function handleStepEnter(chapter) {
    const clockElement = document.getElementById('clock');
    
    switch (chapter) {
        case 'chapter-1':
            map.flyTo({ center: [59.38618, 71.89288], zoom: 2, pitch: 6, bearing: 7.20 });
            if (clockElement) clockElement.style.display = 'none'; // Hide clock
            map.setLayoutProperty('pioneer-layer', 'visibility', 'none'); // Hide the pioneer layer
            map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
            map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
            map.setLayoutProperty('asya-path-layer', 'visibility', 'none'); // Hide the asya path layer
            stopBlinkingAnimation(); // Stop any ongoing animation
            break;
        case 'chapter-2':
            map.flyTo({ center: [28.29103, 71.51573], zoom: 3.9, pitch: 0, bearing: -10.18 });
            if (clockElement) clockElement.style.display = 'block'; // Show clock
            updateClock('From 15th July - 6th August 2024');
            map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Show the pioneer layer
            map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
            map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
            map.setLayoutProperty('asya-path-layer', 'visibility', 'none'); // Hide the asya path layer
            stopBlinkingAnimation(); // Stop any ongoing animation
            break;
        case 'chapter-3':
            map.flyTo({ center: [58.86907, 71.03377], zoom: 3.9, pitch: 0, bearing: -10.18 });
            if (clockElement) clockElement.style.display = 'block'; // Show clock
            updateClock('On 1st August 2024');
            map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Keep the pioneer layer visible
            map.setLayoutProperty('arctic2-point-layer', 'visibility', 'visible'); // Show the arctic2 point layer
            map.setLayoutProperty('arctic2-label-layer', 'visibility', 'visible'); // Show the arctic2 label layer
            map.setLayoutProperty('asya-path-layer', 'visibility', 'none'); // Hide the asya path layer
            startBlinkingAnimation(); // Start the blinking animation
            break;
        case 'chapter-4':
            map.flyTo({ center: [28.29103, 71.51573], zoom: 3.9, pitch: 0, bearing: -10.18 });
            if (clockElement) clockElement.style.display = 'block'; // Show clock
            updateClock('From 2nd August - 15th August 2024');
            map.setLayoutProperty('pioneer-layer', 'visibility', 'none'); // Hide the pioneer layer
            map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
            map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
            map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Show the asya path layer
            stopBlinkingAnimation(); // Stop any ongoing animation
            break;    
        case 'chapter-5':
            map.flyTo({ center: [58.86907, 71.03377], zoom: 3.9, pitch: 0, bearing: -10.18 });
            if (clockElement) clockElement.style.display = 'block'; // Show clock
            updateClock('On 11th August 2024');
            map.setLayoutProperty('pioneer-layer', 'visibility', 'none'); // Show the pioneer layer
            map.setLayoutProperty('arctic2-point-layer', 'visibility', 'visible'); // Hide the arctic2 point layer
            map.setLayoutProperty('arctic2-label-layer', 'visibility', 'visible'); // Hide the arctic2 label layer
            map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
            startBlinkingAnimation(); // Stop any ongoing animation
            break;
            case 'chapter-6':
                map.flyTo({ center: [28.29103, 71.51573], zoom: 4.7, pitch: 0, bearing: -10.18 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('Asya Energy: 2-15 August 2024/ Pioneer: 15 July-6th August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;
            case 'chapter-7':
                map.flyTo({ center: [68.10619, 17.51712], zoom: 3.36, pitch: 2, bearing: 0 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('15 July-15 August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;  
            case 'chapter-8':
                map.flyTo({ center: [48.49182, 24.24954], zoom: 4.00, pitch: 0, bearing: 0 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('15 July-15 August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;
            case 'chapter-9':
                map.flyTo({ center: [32.36336, 31.58181], zoom: 7.05, pitch: 0, bearing: 0 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('15 July-15 August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;
            case 'chapter-10':
                map.flyTo({ center: [49.05539, 27.17398], zoom:1.86, pitch: 2, bearing: 0 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('15 July-15 August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;
            case 'chapter-11':
                map.flyTo({ center: [96.19104, 51.76388], zoom: 2.23, pitch: 2, bearing: 0 });
                if (clockElement) clockElement.style.display = 'block'; // Show clock
                updateClock('15 July-15 August 2024');
                map.setLayoutProperty('pioneer-layer', 'visibility', 'visible'); // Hide the pioneer layer
                map.setLayoutProperty('arctic2-point-layer', 'visibility', 'none'); // Hide the arctic2 point layer
                map.setLayoutProperty('arctic2-label-layer', 'visibility', 'none'); // Hide the arctic2 label layer
                map.setLayoutProperty('asya-path-layer', 'visibility', 'visible'); // Hide the asya path layer
                stopBlinkingAnimation(); // Stop any ongoing animation
                break;            
        }
    }
    
    function handleStepExit(chapter) {
        stopAnimation(); // Ensure this function stops the current animation
    }
    
    function updateClock(timeString) {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.innerText = timeString;
        } else {
            console.warn('Clock element not found');
        }
    }
    
    function stopAnimation() {
        if (window.requestId) {
            cancelAnimationFrame(window.requestId);
            window.requestId = null;
        }
    }