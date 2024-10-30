import { Image } from '@nativescript/core';
import * as camera from '@nativescript/camera';
import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function CameraScreen() {
    const [imageSource, setImageSource] = React.useState<string | null>(null);
    const [prediction, setPrediction] = React.useState<string | null>(null);

    const takePicture = async () => {
        try {
            const options = {
                width: 300,
                height: 300,
                keepAspectRatio: true,
                saveToGallery: false
            };

            const imageAsset = await camera.takePicture(options);
            setImageSource(imageAsset.android || imageAsset.ios);
            
            // Here you would integrate your ML model
            // const result = await predictDisease(imageAsset);
            // setPrediction(result);
        } catch (err) {
            console.error('Error taking picture:', err);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl font-bold mb-4">
                Crop Disease Detector
            </label>
            
            {imageSource && (
                <image
                    src={imageSource}
                    style={styles.preview}
                />
            )}
            
            <button
                className="bg-blue-500 text-white p-4 rounded-lg mb-4"
                onTap={takePicture}
            >
                Take Picture
            </button>
            
            {prediction && (
                <label className="text-lg mt-4">
                    Detected Disease: {prediction}
                </label>
            )}
            
            <label className="text-sm text-gray-600 mt-4">
                Point camera at the affected plant leaves for best results
            </label>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    preview: {
        width: 300,
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
    }
});