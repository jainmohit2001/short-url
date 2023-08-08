'use client'

import { Loader } from '@/components/Loader'
import { ModalContent } from '@/components/ModalContent'
import { Close, Delete } from '@mui/icons-material'
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { Url } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Profile() {
  const { status, data: session } = useSession()
  const [urlData, setUrlData] = useState([] as Url[])
  const [isLoading, setLoading] = useState(false)
  const [totalUrlCount, setTotalUrlCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [open, setOpen] = useState(false)
  const take = 10

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  async function addUrl(e: any) {
    console.log(e)
    e.preventDefault()
    const formData = new FormData(e.target)
    for (const value of formData.values()) {
      console.log(value)
    }

    fetch('/api/urls', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data?: Url) => {
        console.log(data)
      })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true)
      fetch(`/api/urls?skip=${skip}&take=${take}`)
        .then((res) => res.json())
        .then((data: IPaginatedUrls) => {
          console.log(data)
          setUrlData(data.results)
          setTotalUrlCount(data.totalCount ?? 0)
          setLoading(false)
        })
    }
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
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <p>Total Urls: {totalUrlCount}</p>
          <Button variant="contained" onClick={handleOpen}>
            Add Url
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody className={isLoading ? 'opacity-50' : ''}>
            {urlData &&
              urlData.length > 0 &&
              urlData.map((obj, index) => (
                <TableRow key={obj.id}>
                  <TableCell>
                    <p className="text-sm">{obj.originalUrl}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{obj.shortUrl}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{obj.createdAt.toDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <Button endIcon={<Delete />}></Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <div className="flex flex-row items-center justify-end border-b-2 border-b-gray-300">
            <Button onClick={handleClose} variant="text">
              <Close className="!font-bold !text-black" />
            </Button>
          </div>
          <form className="flex flex-col gap-4" onSubmit={addUrl}>
            <div className="w-100 flex items-center justify-center">
              <TextField
                label="Url"
                name="url"
                type="url"
                placeholder="Url"
                required
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button variant="contained" type="submit">
                Add
              </Button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
