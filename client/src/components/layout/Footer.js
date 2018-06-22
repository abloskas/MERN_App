import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright&copy; {new Date().getFullYear()} DevCrowd
      <p className="text-white mt-1 text-center">
        <a className="text-white" href="mailto:a.bloskas@yahoo.com">
          Email the Creator
        </a>
      </p>
    </footer>
  );
};
