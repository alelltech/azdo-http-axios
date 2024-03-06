# Http axios

This extension provides 1 tasks!

* `AxiosRequest`

## Features

* Http Requests with `Axios`.


## Basic queries syntax

## Usage sample

```yaml
- job:
  ...
  steps:
  - task: AxiosRequest@4
    displayName: "Axios Request from Insomnia"
    inputs:
      source: |
        ...
        var options = {
          method: 'GET',
          url: 'http://localhost:7007/api/catalog/entities',
          params: {filter: ['kind=api', 'relations']},
          headers: {'User-Agent': 'insomnia/2023.5.8'}
        };
        ...

  - task: AxiosRequest@4
    displayName: "Axios Request from Postman"
    inputs:
      source: |
        ...
        let config = {
          method: 'GET',
          url: 'http://localhost:7007/api/catalog/entities',
          params: {filter: ['kind=api', 'relations']},
          headers: {'User-Agent': 'insomnia/2023.5.8'}
        };
        ...


```

## Help us

See [CONTRIBUTING.md](https://github.com/alelltech/azdo-http-axios/blob/main/CONTRIBUTING.md)



