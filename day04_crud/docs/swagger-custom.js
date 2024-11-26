window.onload = function () {
  const ui = SwaggerUIBundle({
    url: "/swagger/doc.json",
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
  });

  // Add a login button
  const loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.onclick = function () {
    const token = prompt("Enter your token:");
    if (token) {
      ui.preauthorizeApiKey("Authorization", "Bearer " + token);
    }
  };

  document.getElementById("swagger-ui").appendChild(loginButton);
};
