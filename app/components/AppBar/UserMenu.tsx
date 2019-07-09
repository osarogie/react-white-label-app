import BrowserLink from '../link/BrowserLink'

export function UserMenu() {
  return (
    <div style={{ minWidth: 300 }}>
      <BrowserLink
        href="/account"
        style={{ display: 'block', marginBottom: 10 }}
      >
        My Account
      </BrowserLink>
      <BrowserLink
        href="/settings"
        style={{ display: 'block', marginBottom: 10 }}
      >
        Settings
      </BrowserLink>
      <BrowserLink href="/exit" style={{ display: 'block', marginBottom: 10 }}>
        Logout
      </BrowserLink>
    </div>
  )
}
