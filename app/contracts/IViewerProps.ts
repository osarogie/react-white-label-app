import { IViewer } from '../contracts/IViewer'

export interface IViewerProps {
  viewer?: IViewer
  hasViewer: boolean
  refetch: () => void
  requireViewer: () => boolean
}
