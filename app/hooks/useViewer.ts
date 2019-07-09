import * as React from 'react'
import { IViewerProps } from '../contracts/IViewerProps'

let defaultViewer: IViewerProps | null = null

export const ViewerContext = React.createContext(defaultViewer)

export function useViewer(): IViewerProps {
  const { viewer, refetch } = React.useContext(ViewerContext)
  const hasViewer = !!viewer

  function requireViewer(message = 'Login') {
    if (hasViewer) return true
    // showModal(message)
    return false
  }

  return {
    viewer,
    refetch,
    hasViewer: hasViewer,
    requireViewer: requireViewer
  }
}
