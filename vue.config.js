module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "productName": "name-it",
                "appId": "com.sourceflow.name-it",
                "copyright": "Copyright @ 2019 ${author}",
                "directories": {
                    "output": "build"
                },
                "win": {
                    "target": ["nsis"],
                    "icon": "build/icons/512x512.ico",
                    "artifactName": "${productName}-${version}.${ext}"
                },
                "linux": {
                    "maintainer": "Hannes Thaller",
                    "target": ["AppImage"],
                    "icon": "build/icons",
                    "category": "Utility"
                },
            },
        }
    }
};
