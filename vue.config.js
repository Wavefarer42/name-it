module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "productName": "name-it",
                "appId": "com.sourceflow.name-it",
                "copyright":"Copyright @ 2019 ${author}",
                "directories": {
                    "output": "build"
                },
                "dmg": {
                    "contents": [
                        {
                            "x": 410,
                            "y": 150,
                            "type": "link",
                            "path": "/Applications"
                        },
                        {
                            "x": 130,
                            "y": 150,
                            "type": "file"
                        }
                    ]
                },
                "mac": {
                    "icon": "build/icons/512x512.icns"
                },
                "win": {
                    "target":["nsis", "msi"],
                    "icon": "build/icons/512x512.ico"
                },
                "linux": {
                    "maintainer":"Hannes Thaller",
                    "target": ["AppImage", "deb"],
                    "icon": "build/icons",
                    "category": "Utility"
                }
            },
        }
    }
};
