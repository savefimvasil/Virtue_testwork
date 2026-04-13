# Some details about completed work. 

## How to run the project:

- backend
  - `npm i`
  - `npm run start:dev`
- frontend
  - `npm i`
  - `npm run dev`

in `/backend` and `/frontend` directories I still have default readmes from frameworks, are all details there.

## What was done so far:

### back-end (`/backend` directory).
  
- I used NestJS from scratch (https://docs.nestjs.com/first-steps)
- I created a small `data` module to preload data from JSON file and keep it locally in memory
- I created `employees` and `suggestions` modules, and added API endpoints
  - GET employees,
  - GET employee by ID
  - GET suggestions by employee ID
  - PUT for suggestions (update status, DTO described in the `src/suggestions/dto/update-suggestion-status.dto.ts`)
- For the backend architecture, I followed NestJS’s standard Module–Controller–Service pattern.


### Front-end (`/frontend` directory).

- I used Vue3 from scratch (https://vuejs.org/guide/quick-start), tailwind for styling;
- I wanted to do it custom, without using any UI library, so I found public Figma designs (https://www.figma.com/community/file/1020707462188017225). I didn't follow the designs exactly, but I tried to make it look more or less similar. Used palette from this Figma file.
  - (!) I decided not to spend less time on UI, than on logic, so tailwind configuration can look a bit messy and not finished.
- I created API plugin (`src/plugins/api.ts`) to handle API success and error responses.
- Routing and views:
  - `HomeView` - main page with an employee list
  - `EmployeeView` is the parent employee details page. I implemented it as a nested route with an automatic redirect to `/employee/:employeeId/suggestions`. The idea was to use `EmployeeView` as a shared layout for employee-related sections, with tabs for different kinds of information. To demonstrate that structure, I also added an `EmployeeAbout` tab and route as a placeholder for future expansion.
- Composables:
  - `useAppError` - composable to handle 404 API response and show error page
  - `useEmployees` - composable to fetch employees/employee from API. I was thinking of making it in a component or a composable, but I decided to use a composable and also added unit tests for it.
  - `useLogging` - composable to log API calls and errors. potentially it can be used to send errors to the Sentry or any tracking service
- Components:
  - I wanted to demonstrate different ways of component usage. I'll describe the most important components below
  - `BaseCard` - a default card with a white background that is "widget-like" component and can handle loading state, titles and content. I did it with slots and reused it as much as possible
  - `BaseTable` - simple table component. I didn't make sorting/filtering logic, just wanted to show that I can work with dynamic components. `BaseTable` can show strings/numbers/custom components in cells, depends on configuration
  - `BaseButton`, `LevelBadge` - components used in table cells. Minimal logic, mostly custom styling based on props
- Testing:
  - (!) I did not test everything. I just added unit tests for `useEmployees` and `LevelBadge`, to show that I care about testing both components and composables.

## What can be done next, some ideas: 
- Add backend tests 
- Add a database instead of in-memory data 
- Increase test coverage on the frontend, including component tests and snapshot tests 
- Improve UI quality and polish. Better mobile support, hovers etc
- Make suggestions fully editable 
- Improve some TypeScript typings and overall type safety

