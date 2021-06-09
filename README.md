# og-tag-scrapper

og: tag scrapper is an api to scrap og tags / meta tags
and return title, description, images in the api

```sh
POST  / 
payload {"url": ""}
```
#### Sample CURL to use the API

```
curl --location --request POST 'https://hl82j05f4m.execute-api.us-east-1.amazonaws.com/dev/api/v1/meta-tag' \
--header 'Authorization: *********' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://www.npmjs.com/package/dotenv"
}'
```

> Note: This api has basic auth enabled. without authentication it will throw  401 error. 
> To use the api need to add __valid basic auth credentials__ in the place of __*********__

----------------------------------------------------------------------------------------------------

* Basic Auth cred is added as environment variable for basic security on API layer.
* and meta tags are added in environment variable too to update meta params dynamically if needed in future.

#### Release Notes:

* Currently this is deployed in dev env.
* Caching layer like Elasticache / DAX can be added for performance improvement ( Future scope)


