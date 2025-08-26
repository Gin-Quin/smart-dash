# Smart Dash

Turn natural language into insights. Smart Dash lets you query your databases using everyday language and turn the answers into beautiful, shareable dashboards.

## Goal

Build a web application that:
- Understands natural language questions and translates them into database queries (e.g., SQL).
- Works across multiple data sources with pluggable connectors.
- Helps you explore results quickly with auto-suggested charts and summaries.
- Lets you compose results into interactive dashboards with filters, drilldowns, and sharing options.
- Emphasizes correctness, transparency (show the generated query), and ease of iteration.

## Why

Analysts and operators spend too much time writing repetitive queries and moving results into separate tools to visualize and share. Smart Dash removes that friction so you can go from question to insight to dashboard in minutes.

## Tech (initial direction)

- Runtime/Tooling: Bun
- Frontend: SolidJS with SolidStart
- Server: SolidStart routes and API handlers
- Data: Pluggable database connectors (to be defined)
- Auth/Permissions/Sharing: To be defined

## Status

Early work-in-progress. This README will evolve as the design and implementation details solidify.

## High-level Workflow (target experience)

1. Connect one or more databases.
2. Ask a question in natural language.
3. Review the generated query, adjust if needed, and run.
4. Explore results and choose visualizations.
5. Save and arrange visualizations into dashboards.
6. Share dashboards with teammates or stakeholders.

## Roadmap (to be expanded)

- Data connectors
- Query generation and verification
- Visualization library and dashboard builder
- Sharing, permissions, and versioning
- Deployment guides

## Contributing

Details to come as the project structure stabilizes.

## License

TBD
