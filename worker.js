let clouds = [];

onmessage = function (e) {
    const { action, cloudsData, deltaTime } = e.data;

    if (action === "initialize") {
        clouds = cloudsData;
    } else if (action === "update") {
        clouds.forEach(cloud => {
            cloud.x += cloud.speed * deltaTime;

            if (cloud.x > e.data.canvasWidth + 100) {
                cloud.x = -100;
            } else if (cloud.x < -100) {
                cloud.x = e.data.canvasWidth + 100;
            }
        });

        // Send updated positions back to the main thread
        postMessage(clouds);
    }
};