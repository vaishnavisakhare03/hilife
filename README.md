# HiLife React App

This is a React app created with Vite, configured to connect to a Spring Boot backend.

## Run locally

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   ```

The app runs at `http://localhost:3000`.

## Spring Boot integration

This app proxies any request starting with `/api` to `http://localhost:8080`.

Example Spring Boot controller:

```java
@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "Hello from Spring Boot!");
    }
}
```

Then click the button in the UI to call `/api/hello`.
