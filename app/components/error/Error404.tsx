import { BrowserLink } from '../link/BrowserLink'
import { PlainContainer } from '../container/PlainContainer'

export function Error404() {
  return (
    <PlainContainer>
      <div className="error-container">
        <h2>404</h2>
        <h5>Nothing to see here</h5>
        <p>
          Perhaps you need to{' '}
          <u>
            <BrowserLink href="/login">login</BrowserLink>
          </u>
        </p>
      </div>
      <style jsx>{`
        :global(#__next) {
          background-color: transparent !important;
        }
        :global(.toolbar) {
          display: none;
        }
        :global(body) {
          text-align: center;
        }
        h2 {
          color: rgb(21, 39, 152);
          font-size: 125px;
          margin-top: 100px;
          margin-bottom: 20px;
          line-height: initial;
          text-align: center;
        }
        h5 {
          color: rgb(21, 39, 152);
          font-size: 44px;
          line-height: initial;
          text-align: center;
          margin-top: 20px;
        }
        .error-container {
          align-items: center;
          justify-content: center;
          flex: 1 1 0%;
        }
      `}</style>
    </PlainContainer>
  )
}
