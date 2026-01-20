const sectionsContainer = document.querySelector("#sections");
const jsonOutput = document.querySelector("#json-output");
const sectionTemplate = document.querySelector("#section-template");
const fieldTemplate = document.querySelector("#field-template");
const addSectionButton = document.querySelector("#add-section");
const exportButton = document.querySelector("#export-json");
const loadSampleButton = document.querySelector("#load-sample");

const state = {
  sections: [],
};

const defaultField = () => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  label: "New field",
  type: "text",
  required: false,
});

const defaultSection = () => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  title: "New section",
  fields: [defaultField()],
});

const syncOutput = () => {
  jsonOutput.value = JSON.stringify({ sections: state.sections }, null, 2);
};

const updateSection = (sectionId, data) => {
  const section = state.sections.find((item) => item.id === sectionId);
  if (!section) return;
  Object.assign(section, data);
  syncOutput();
};

const updateField = (sectionId, fieldId, data) => {
  const section = state.sections.find((item) => item.id === sectionId);
  if (!section) return;
  const field = section.fields.find((item) => item.id === fieldId);
  if (!field) return;
  Object.assign(field, data);
  syncOutput();
};

const removeSection = (sectionId) => {
  state.sections = state.sections.filter((item) => item.id !== sectionId);
  renderSections();
};

const removeField = (sectionId, fieldId) => {
  const section = state.sections.find((item) => item.id === sectionId);
  if (!section) return;
  section.fields = section.fields.filter((item) => item.id !== fieldId);
  if (section.fields.length === 0) {
    section.fields.push(defaultField());
  }
  renderSections();
};

const addField = (sectionId) => {
  const section = state.sections.find((item) => item.id === sectionId);
  if (!section) return;
  section.fields.push(defaultField());
  renderSections();
};

const renderField = (sectionId, field) => {
  const fieldNode = fieldTemplate.content.firstElementChild.cloneNode(true);
  const labelInput = fieldNode.querySelector("[name='field-label']");
  const typeSelect = fieldNode.querySelector("[name='field-type']");
  const requiredInput = fieldNode.querySelector("[name='field-required']");
  const removeButton = fieldNode.querySelector("[data-action='remove-field']");

  labelInput.value = field.label;
  typeSelect.value = field.type;
  requiredInput.checked = field.required;

  labelInput.addEventListener("input", (event) => {
    updateField(sectionId, field.id, { label: event.target.value });
  });

  typeSelect.addEventListener("change", (event) => {
    updateField(sectionId, field.id, { type: event.target.value });
  });

  requiredInput.addEventListener("change", (event) => {
    updateField(sectionId, field.id, { required: event.target.checked });
  });

  removeButton.addEventListener("click", () => {
    removeField(sectionId, field.id);
  });

  return fieldNode;
};

const renderSection = (section) => {
  const sectionNode = sectionTemplate.content.firstElementChild.cloneNode(true);
  const titleInput = sectionNode.querySelector("[name='section-title']");
  const fieldsContainer = sectionNode.querySelector(".fields");
  const addFieldButton = sectionNode.querySelector("[data-action='add-field']");
  const removeSectionButton = sectionNode.querySelector(
    "[data-action='remove-section']"
  );

  titleInput.value = section.title;

  titleInput.addEventListener("input", (event) => {
    updateSection(section.id, { title: event.target.value });
  });

  addFieldButton.addEventListener("click", () => {
    addField(section.id);
  });

  removeSectionButton.addEventListener("click", () => {
    removeSection(section.id);
  });

  section.fields.forEach((field) => {
    fieldsContainer.appendChild(renderField(section.id, field));
  });

  return sectionNode;
};

const renderSections = () => {
  sectionsContainer.innerHTML = "";
  state.sections.forEach((section) => {
    sectionsContainer.appendChild(renderSection(section));
  });
  syncOutput();
};

const loadSample = async () => {
  const response = await fetch("jeesonvoorbeeld3.json");
  const data = await response.json();
  state.sections = data.sections ?? [];
  if (state.sections.length === 0) {
    state.sections = [defaultSection()];
  }
  renderSections();
};

addSectionButton.addEventListener("click", () => {
  state.sections.push(defaultSection());
  renderSections();
});

exportButton.addEventListener("click", async () => {
  syncOutput();
  await navigator.clipboard.writeText(jsonOutput.value);
  exportButton.textContent = "Copied!";
  setTimeout(() => {
    exportButton.textContent = "Export JSON";
  }, 1500);
});

loadSampleButton.addEventListener("click", () => {
  loadSample();
});

state.sections = [defaultSection()];
renderSections();
