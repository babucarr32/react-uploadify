![Screenshot of ReactUploadify](/src/images/imgShot.png)

# Introduction

`ReactUploadify` is a flexible npm package that simplifies the process of uploading images from a user's device to a web browser. It offers a set of components and utilities to manage image uploads effectively within React applications.

This package, `ReactUploadify`, stands as a robust solution designed specifically to simplify the otherwise intricate task of enabling users to easily upload images from their personal devices directly to web browsers. Its primary goal is to simplify and optimize the image uploading process within React-based applications.

The package accomplishes this through a collection of components and utilities that cater to various aspects of image uploads. By leveraging these components and utilities, developers can effortlessly integrate and manage image uploading functionalities within their React applications.

The components provided within this package, such as `DragAndDrop` and `ImageSelect`, present users with multiple options for uploading images. The `DragAndDrop` component enables an intuitive, drag-and-drop interface, allowing users to simply drag images from their local storage and drop them onto a designated area within the browser for fast and easy uploads. On the other hand, the `ImageSelect` component provides a more traditional file input method, where users can select images using the browser's file picker.

Additionally, the package includes the `ImageUpload` component, which combines the functionalities of both the `DragAndDrop` and `ImageSelect` components into a pre-designed UI, providing users with an all-in-one interface for image uploads.

Additionally, `ReactUploadify` isn't just about facilitating basic image uploads. It goes beyond by offering various features to enhance user experience and control over the uploading process. These include functionalities like providing a preview of selected images, allowing users to adjust image quality before uploading, setting specific file size limits to manage data volume, and defining the maximum number of images permitted for upload.

Moreover, the package introduces a powerful utility named `useImageUpload`. This custom hook grants developers access to a suite of essential APIs that simplify the management of image uploads within functional components. Through this hook, developers can interact with key functionalities such as accessing the Blob object of uploaded images, retrieving additional details about the uploaded images, handling potential errors during the upload process, retrieving an array containing the uploaded images, and monitoring whether a file is being dragged over the designated drop area.

Overall, `ReactUploadify` stands as a comprehensive toolkit, providing easy and efficient means of integrating and managing image upload functionalities within React applications, enhancing user interaction, and streamlining the overall user experience.

## Installation

You can install `ReactUploadify` via npm:

```
npm install react-uploadify
```

Add the following to the `content` of your `tailwind.config.js`
`"./node_modules/react-uploadify/**/*.{js,ts,jsx,tsx}"`
It should look similar to the following.

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-uploadify/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

> [!NOTE]
> This package uses [Jotai](https://jotai.org/) for state management. Meaning, if you render a a component(`DragAndDrop`, `ImageSelect`, etc) in component A. You can use the api's provided by the custom hook (`useImageUpload`) in component B directly, without having to pass props.

# Components

## DragAndDrop

The `DragAndDrop` component provides an intuitive interface for users to drag and drop images directly into the browser window for upload.

Example:

```
import { DragAndDrop } from 'react-uploadify';

const MyComponent = () => {
  return (
    <DragAndDrop />
  );
};
```

## ImageSelect

The `ImageSelect` component provides a file input for selecting images from the user's device.

Example:

```
import { ImageSelect } from 'react-uploadify';

const MyComponent = () => {
  return (
    <ImageSelect />
  );
};
```

## ImageUpload

The `ImageUpload` component combines the functionalities of both the `DragAndDrop` and `ImageSelect` components.

Example:

```
import { ImageUpload } from 'react-uploadify';

const MyComponent = () => {
  return (
    <ImageUpload />
  );
};
```

## Images

The `Images` component displays a preview of the selected images.

Example:

```
import { Images } from 'react-uploadify';

const MyComponent = () => {
  return (
    <Images />
  );
};
```

## Features

- **Image Preview:** Display a preview of the selected images.
- **Image Details:** Details about the uploaded image.
- **Image Quality Reduction:** Allow users to reduce image quality.
- **File Size Limit:** Set a file size limit for uploaded images in `kb` or `mb`.
- **Number of Images Limit:** Specify the maximum number of images that can be uploaded.

## Custom Hook - useImageUpload

The `useImageUpload` hook exposes the following APIs:

- **blobImages:** An array of Blob objects representing the uploaded images.
- **details:** Additional details about the uploaded images.
- **error:** Error information, if any, during the upload process.
- **images:** An array of uploaded images.
- **reset:** A function for resetting the states.
- **isDraggedOver:** Boolean indicating whether a file is being dragged over the drop area.

Example:

```
import { useImageUpload } from 'react-uploadify';

const MyComponent = () => {
  const {
    error,
    images,
    details,
    blobImages,
    isDraggedOver
  } = useImageUpload();

  // Your component logic here

  return (
    // Your component JSX here
  );
};
```

# More Examples

### How to use the ImageSelect component.

```
import { ImageSelect, useImageUpload, Images } from "react-uploadify";

const DeleteIcon = () => {
  return (
    <svg
      width="24"
      fill="none"
      height="24"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

function App() {
  const { images, blobImages } = useImageUpload();

  const handleSaveImagesToDatabase = () => {
    blobImages
    // Your logic goes here
  }

  return (
    <>
      <ImageSelect
        limit={3}
        quality={100}
        fileSizeLimit="200mb"
        content={
          <div className="w-fit rounded-md text-white shadow-md bg-blue-500 hover:shadow-lg transition px-[16px] py-[8px] cursor-pointer hover:bg-blue-700">
            Upload
          </div>
        }
      />

      <div className={"mt-3 flex gap-2 w-full"}>
        {images &&
          images.map((image: string, index: number) => (
            <div key={index} className="relative">
              <img className={"w-20"} src={image} />
            </div>
          ))}
      </div>

      {/* You can also use the Images component to display images */}
      <Images
        imageClassName="w-72"
        className="border-2 p-5"
        deleteIcon={<DeleteIcon />}
        deleteButtonClassName="p-3 rounded-full bg-red-400"
      />
    </>
  );
}

export default App;
```

### How to use the DragAndDrop component.

```
import { DragAndDrop, useImageUpload, Images } from "react-uploadify";

const DeleteIcon = () => {
  return (
    <svg
      width="24"
      fill="none"
      height="24"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

function App() {
  const { images, error, isDraggedOver, blobImages } = useImageUpload();

  const handleSaveImagesToDatabase = () => {
    blobImages
    // Your logic goes here
  }

  return (
    <>
      {error.message && <h1 className="text-red-500">{error.message}</h1>}
      <DragAndDrop
        limit={5}
        quality={10}
        fileSizeLimit="3mb"
        content={
          <div
            className={`p-4 border-2 border-dashed h-56 flex justify-center items-center ${
              isDraggedOver ? "border-red-500" : "border-blue-500"
            }`}
          >
            <p className="text-xl text-gray-700">Drag and Drop images here.</p>
          </div>
        }
      />

      <div className={"mt-3 flex gap-2 w-full"}>
        {images &&
          images.map((image: string, index: number) => (
            <div key={index} className="relative">
              <img className={"w-20"} src={image} />
            </div>
          ))}
      </div>

      {/* You can also use the Images component to display images */}
      <Images
        imageClassName="w-72"
        className="border-2 p-5"
        deleteIcon={<DeleteIcon />}
        deleteButtonClassName="p-3 rounded-full bg-red-400"
      />
    </>
  );
}

export default App;
```

### How to use the ImageUpload component.

```
import { ImageUpload } from "react-uploadify";

const DeleteIcon = () => {
  return (
    <svg
      width="24"
      fill="none"
      height="24"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

function App() {
  return (
    <ImageUpload
      limit={5}
      quality={100}
      align="center"
      fileSizeLimit="200mb"
      imagesClassName="gap-10"
      selectText="Upload image"
      deleteIcon={<DeleteIcon />}
      text="DRAG AND DROP HERE..."
      selectClassName="bg-red-500"
      className="border-orange-500"
      errorMessageClassName="text-bold text-green-500"
    />
  );
}

export default App;
```

# Contributing

We welcome contributions! Please follow our Contribution Guidelines.

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.

```
Please note that you should include an actual `LICENSE.md` file with the appropriate license text for your project. Additionally, consider adding a `CONTRIBUTING.md` file if you want to guide contributors on how to contribute to your project. Customize the content based on your specific needs and additional features of your package.
```
