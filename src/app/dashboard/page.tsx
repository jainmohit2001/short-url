'use client'

import { Loader } from '@/components/Loader'
import {
  defaultLightTheme,
  defaultDarkTheme,
} from '@/components/ThemeRegistry/theme'
import copyToClipboard from '@/lib/copyToClipboard'
import { Close, Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  styled,
  tableCellClasses,
} from '@mui/material'
import { Url } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    overflowWrap: 'break-word',
  },
  ':first-of-type': {
    maxWidth: '360px',
  },
  ':first-of-type p': {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const modalContentStyle = {
  maxWidth: {
    sm: 500,
  },
  margin: '1.75rem auto',
  background: defaultDarkTheme.palette.grey[200],
  position: 'relative',
  display: 'flex',
  WebkitBoxOrient: 'vertical',
  WebkitBoxDirection: 'normal',
  msFlexDirection: 'column',
  flexDirection: 'column',
  width: '100%',
  backgroundClip: 'padding-box',
  border: '1px solid rgba(0,0,0,.2)',
  borderRadius: '0.3rem',
  outline: 0,
  gap: '8px',
  padding: '8px',
}

const take = 10

export default function Profile() {
  const { status, data: session } = useSession()
  const [urlData, setUrlData] = useState([] as Url[])
  const [isLoading, setLoading] = useState(false)
  const [totalUrlCount, setTotalUrlCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [open, setOpen] = useState(false)
  const [addUrlError, setAddUrlError] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onPageChange = (event: React.MouseEvent | null, page: number): void => {
    if (isLoading) {
      return
    }
    setSkip(page * take)
    setCurrentPage(page)
  }

  function addUrl(e: any) {
    e.preventDefault()
    const formData = {
      url: e.target.url.value,
    }

    fetch('/api/urls', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const error = res.status !== 200
      res.json().then((data) => {
        if (error && data.details) {
          setAddUrlError(data.details.toString())
        } else if (!error && addUrlError !== '') {
          setAddUrlError('')
          const url = data as Url
          urlData.splice(1, 0, url)
          setUrlData(urlData)
          setOpen(false)
          enqueueSnackbar('Successfully added!')
          setSkip(0)
        }
      })
    })
  }

  const onUrlClick = (text: string) => {
    copyToClipboard(text)
    enqueueSnackbar('Copied to clipboard!', { variant: 'info' })
  }

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      return
    }
    setLoading(true)
    fetch(`/api/urls?skip=${skip}&take=${take}`)
      .then((res) => res.json())
      .then((data: IPaginatedUrls) => {
        setUrlData(data.results)
        setTotalUrlCount(data.totalCount)
        setLoading(false)
      })
  }, [status, skip])

  if (status === 'loading') {
    return <Loader />
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center justify-center rounded bg-gray-200 p-5">
          <Button
            variant="contained"
            className="!text-bold !gap-4 !bg-white !py-0 !pr-0 !shadow-xl"
            onClick={() => signIn('google')}
          >
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={30}
              height={30}
              className="py-3"
            />
            <span className="bg-blue-500 px-4 py-3">Sign in with Google</span>
          </Button>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return <div>Invalid User</div>
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <p>Total Urls: {totalUrlCount}</p>
          <Button variant="contained" onClick={handleOpen}>
            Add Url
          </Button>
        </div>
        <TableContainer className="relative rounded-md">
          {isLoading && (
            <div className="l-0 t-0 absolute z-10 m-auto flex h-full w-full items-center justify-center ">
              <CircularProgress size={80}></CircularProgress>
            </div>
          )}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Original URL</StyledTableCell>
                <StyledTableCell>Short URL</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={isLoading ? 'opacity-30' : ''}>
              {urlData &&
                urlData.length > 0 &&
                urlData.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Tooltip
                        title={obj.originalUrl}
                        onClick={() => onUrlClick(obj.originalUrl)}
                      >
                        <p>{obj.originalUrl}</p>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell onClick={() => onUrlClick(obj.shortUrl)}>
                      <p>{obj.shortUrl}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p>{new Date(obj.createdAt.toString()).toDateString()}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" size="small">
                        <Delete />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={totalUrlCount}
                  onPageChange={onPageChange}
                  page={currentPage}
                  rowsPerPage={take}
                  rowsPerPageOptions={[take]}
                ></TablePagination>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <ThemeProvider theme={defaultLightTheme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalContentStyle}>
            <div className="flex flex-row items-center justify-end border-b-2 border-b-gray-300">
              <Button onClick={handleClose} variant="text">
                <Close className="!font-bold !text-black" />
              </Button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={addUrl}>
              <div className="w-100 mt-4 flex items-center justify-center">
                <TextField
                  required
                  label="Url"
                  name="url"
                  type="url"
                  placeholder="Url"
                  inputProps={{ style: { color: 'black' } }}
                  error={addUrlError !== ''}
                  helperText={addUrlError !== '' ? addUrlError : null}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <div className="flex w-full items-center justify-center">
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  )
}
