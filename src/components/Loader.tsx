import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'

export async function Loader(props: CircularProgressProps) {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <CircularProgress {...props} />
    </div>
  )
}
