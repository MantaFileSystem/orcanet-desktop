import { TransactionsAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

export const usePeersList = () => {
  const peers = useAtomValue(TransactionsAtom)

  // const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  // const handleNoteSelect = (index: number) => async () => {
  //   setSelectedNoteIndex(index)

  //   if (onSelect) {
  //     onSelect()
  //   }
  // }

  return {
    peers,
    // selectedNoteIndex,
    // handleNoteSelect
  }
}
