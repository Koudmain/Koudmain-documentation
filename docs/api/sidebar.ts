import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/api-publications-users",
    },
    {
      type: "category",
      label: "Publications",
      items: [
        {
          type: "doc",
          id: "api/creates-a-new-publication-in-the-system",
          label: "Creates a new publication in the system.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/edit-a-new-publication-in-the-system",
          label: "Edit a new publication in the system.",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/get-all-publications-in-the-system",
          label: "Get all publications in the system",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-a-publication-by-its-id-in-the-system",
          label: "Get a publication by its id in the system",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-a-publication-in-the-system",
          label: "Delete a publication in the system",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      items: [
        {
          type: "doc",
          id: "api/get-user-with-token",
          label: "Get user with token",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
