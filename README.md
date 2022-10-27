# Component Library List

[Read the list!](https://elastic-rate-cd3.notion.site/75dc1174b0394f04acde30a004683f68?v=f6eac247a5be498d8387ad3febdbd548)

## Data Flow

```mermaid
flowchart LR

A(database_id) -->|notion| B(page_id) -->|notion| C(npm_name)
C -->|npm| D(weekly_flow) --> N(Notion)
C -->|npm| E(last_publish) --> N
C -->|npm| F(repository_url) -->|github| G(github_star) --> N

```

## Reference

- [Notion API](https://developers.notion.com/reference)
- [REST API](https://docs.github.com/en/rest)
- [NPM API](../src/api/npm.ts)
