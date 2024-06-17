# Http axios

This extension provides 1 tasks!

* `Axios`

## Features

* Http Requests with `Axios`.


## Usage sample

Build your Request from `Insomnia` or `Postman` and send via `source` input.

> ⚠️ **We do not evaluate this javascript snippet code**, just get the `config` request data.

![Insomnia](https://raw.githubusercontent.com/alelltech/azdo-http-axios/main/images/copy-from-insomnia.png)




```yaml
- job:
  ...
  steps:
  - task: Axios@4
    name: insomnia
    displayName: "Axios Request from Insomnia"
    inputs:
      poolingRetries: 2
      poolingDelay: 500
      poolingUntil: |
        jq('.body.data..foo.bar')[0] === 'good_value'
      variablePrefix: INSOMNIA_RES_
      source: |
        ...
        var options = {
          method: 'POST',
          url: 'https://mydomain.com/foo/bar',
          data: {foo: {bar: 'request_value'}}
        };

        ...
  - script: |
      echo "Log task output variable:"
      echo $(insomnia.body)
      echo "Log shared variable with custom prpefix:"
      echo $(INSOMNIA_RES_BODY)

  - task: Axios@4
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



