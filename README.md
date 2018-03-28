# Swarm Migration

Migrate all services from one swarm cluster to another.

This tools was created with the propose to support inmutable server strategy for
creation of docker swarm cluster. One way to accomplish is that every change
that you need to make,


## Configuration

As this tools use node config library you must to have a configuration file
located in ./config/default.EXT. As file extension could be many different options
I invited you to [see more...](https://github.com/lorenwest/node-config).

Yaml configuration file example

```Yaml
docker:
  origin:
    url: "http://my.docker.tld/path"
    apiKey: "8cfcd5fc-190b-497c-9efa-603b948e1ea5"
  destination:
    url: "http://my.docker.tld/path"
    apiKey: "8cfcd5fc-190b-497c-9efa-603b948e1ea5"
  registry:
    username: username
    password: password
    serveraddress: "https://my.docker-registry.tld"

logging:
  level: info
```

## Examples

In order to migrate services from one cluster to another you must...

### Migrate networks

### Migrate services

## Roadmap

- [x] Use private registry according to image name
- [ ] Add support for %HOME/.swamigrc config file
