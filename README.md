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
      retries: 2
      variablePrefix: INSOMNIA_RES_
      source: |
        ...
        var axios = require("axios").default;

        var options = {
          method: 'POST',
          url: 'http://localhost:9000/apisix/admin/user/login',
          data: {username: 'admin', password: 'admin'}
        };

        axios.request(options).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
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

  - task: Axios@4
    name: pooling
    displayName: "Axios Request Pooling"
    inputs:
      poolingRetries: 2
      poolingDelay: 500
      # you can also use annother helper functions like:
      #   jq() for JSONPath on JSON reponse
      #   xq() for JSONPath on XML reponse
      #   yq() for JSONPath on YAML reponse
      poolingUntil: |
        jq('.body.data..foo.bar')[0] === 'good_value'
      variablePrefix: INSOMNIA_RES_
      source: |
        ...
        var options = {
          method: 'POST',
          url: 'https://mydomain.com/foo/bar',
          data: {foo: {bar: 'value'}}
        };

        ...

```


## Activating pooling

> Set `poolingUntil` and `poolingRetries` to activate **pooling**.

### Pooling Until

`ECMAScript` expression to stop pooling, see [safe-eval](https://www.npmjs.com/package/safe-eval).

You can also use helper functions to query **body** response with [JSONPath-plus](https://www.npmjs.com/package/jsonpath-plus)

* `jq('.body.foo.bar')[]` for JSON reponses
* `xq('.body.foo.bar._text')[]` for XML reponses see [xml-js **compact mode**](https://www.npmjs.com/package/xml-js)
* `yq('.body.foo.bar')[]` for YAML reponses


## Help us

See [CONTRIBUTING.md](https://github.com/alelltech/azdo-http-axios/blob/main/CONTRIBUTING.md)



*If you like our project help us to make more best solutions.*

> `Bitcoin` / network `BTC`:
>
> `1NvnQAp2e46Fqv4YaoYTioypJZdq4Kc3Az`



> `Etherium` / network `Etherium`:
>
> `0x38a2113604fb3d642bbd009301e94848a499cea4`

> `BitTorrent` / network `Tron`:
>
> `TD9LHa5BjWQpf4oP3uYWP8ghnojJWJy53C`
