import * as React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="container">
        <small className="text-muted">
          Repo:&nbsp;
          <a href="https://github.com/entando/entando-webui">
            https://github.com/entando/entando-webui
          </a>
        </small>
      </div>
    </footer>
  );
};
