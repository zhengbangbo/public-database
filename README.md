# Public Database

- [Npm Packages](#npm-packages)

## Npm Packages
[Table](https://zhengbangbo.notion.site/75dc1174b0394f04acde30a004683f68?v=f6eac247a5be498d8387ad3febdbd548)

```mermaid
flowchart LR

A(database_id) -->|notion| B(page_id) -->|notion| C(npm_name)
C -->|npm| D(Npm Weekly Downloads) --> N(Notion)
C -->|npm| E(Last Publish) --> N
C -->|npm| F(repository_url) -->|github| G(GitHub Star) --> N
C -->|npm mirror| M(NpmMirror Weekly Downloads) --> N
```

## API

- [Notion API](https://developers.notion.com/reference)
- [GITHUB REST API](https://docs.github.com/en/rest)
  - [**Rate limits**](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting)
- [NPM API](./src/api/npm.ts)
- [Npm Mirror API](./src/api/npmmirror.ts)
