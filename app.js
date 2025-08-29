// Fetch and load YAML data
async function loadSOPs() {
  try {
    // Load the YAML file
    const response = await fetch("sops.yaml");
    const yamlText = await response.text();

    // Parse YAML to JS object
    const data = jsyaml.load(yamlText);

    // Populate site info
    document.getElementById("site-title").textContent = data.site.title;
    document.getElementById("site-description").textContent = data.site.description;
    document.getElementById("footer-text").textContent = `© ${data.site.year} ${data.site.organization}`;

    // Populate SOP list
    const sopContainer = document.getElementById("sop-container");
    data.sops.forEach(sop => {
      const li = document.createElement("li");

      const title = document.createElement("h3");
      title.textContent = sop.name;

      const link = document.createElement("a");
      link.href = sop.file;
      link.textContent = `Download ${sop.format.toUpperCase()}`;
      if (sop.download) link.setAttribute("download", "");

      li.appendChild(title);
      li.appendChild(link);
      sopContainer.appendChild(li);
    });

  } catch (error) {
    console.error("Error loading YAML:", error);
  }
}

// Run on page load
loadSOPs();
