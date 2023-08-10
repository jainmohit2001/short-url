'use client'

import { Loader } from '@/components/Loader'
import theme from '@/components/ThemeRegistry/theme'
import { Close, Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from '@mui/material'
import { Url } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  background: theme.palette.grey[200],
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

export default function Profile() {
  const { status, data: session } = useSession()
  const [urlData, setUrlData] = useState([] as Url[])
  const [isLoading, setLoading] = useState(false)
  const [totalUrlCount, setTotalUrlCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [open, setOpen] = useState(false)
  const [addUrlError, setAddUrlError] = useState('')
  const take = 10

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  async function addUrl(e: any) {
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
    }).then(async (res) => {
      const error = res.status !== 200
      const data = await res.json()
      if (error && data.details) {
        setAddUrlError(data.details.toString())
      } else if (!error && addUrlError !== '') {
        setAddUrlError('')
        const url = data as Url
        urlData.splice(1, 0, url)
        setUrlData(urlData)
        handleClose()
        if (skip !== 0) {
          setSkip(0)
        }
      }
    })
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
        setTotalUrlCount(data.totalCount ?? 0)
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
        <TableContainer className="rounded-md">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Original URL</StyledTableCell>
                <StyledTableCell>Short URL</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={isLoading ? 'opacity-50' : ''}>
              {isLoading && <Loader />}
              {urlData &&
                urlData.length > 0 &&
                urlData.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <p className="text-sm">{obj.originalUrl}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="text-sm">{obj.shortUrl}</p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <p className="text-sm">
                        {new Date(obj.createdAt.toString()).toDateString()}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained">
                        <Delete />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
                label="Url"
                name="url"
                type="url"
                placeholder="Url"
                required
                style={{ color: 'black' }}
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
    </>
  )
}
