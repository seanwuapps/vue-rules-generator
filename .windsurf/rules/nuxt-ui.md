---
trigger: always_on
---

Always refer to Nuxt UI documentation when implementing UI

https://ui.nuxt.com/components

When implementing a UI,

1. use Playwright MCP to browse the doc site's commponent listing page https://ui.nuxt.com/components to find the right component to use
2. Click into the component to see it's usages. The "API" section shows what prop/event/slot are available to use, the "Usage" and "Example" sections contain coded examples

NEVER assume a component's existence or the props/events/slots available, always make sure you used the component correctly.
