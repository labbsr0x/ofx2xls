# OFX2XLS - Converting OFX files to XLS &middot; 
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Getting Started

### Requirements

Docker
Docker-compose

### Build and Run

To build and start the container with this api, please run at the root directory of this project:

```
docker-compose up --build
```

When the container is up, you can check at your browser if the service is working accessing *http:\\localhost:3000*. If everything is working you will receive a message "Up and Running!"

To convert a file you can use the *curl* command at your terminal, replacing the **yourOFXFile.ofx** with the path of your OFX file and **yourOFXFile.xls** with the path of your will save your converted file.

```
curl -F 'file=@yourOFXFile.ofx' http://localhost:3000/convert/upload -o yourOFXFile.xls
```

## Contributing

Read below to learn how you can take part in improving this project.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

Labbs has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements.

### License

OFX2XLS is [MIT licensed](./LICENSE).


