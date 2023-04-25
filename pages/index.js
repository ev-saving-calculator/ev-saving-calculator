import React, { useMemo } from 'react'
import Link from '@material-ui/core/Link'
import Calculator from '../components/Calculator'
import { getShareData } from '../src/share'

const Index = ({ shareValues }) => {
  const renderCo2Info = useMemo(
    () => () => (
      <>
        Výchozí hodnota produkce CO<sub>2</sub> při výrobě energie vachází z dat{' '}
        <Link href=" https://faktaoklimatu.cz/infografiky/elektrina-cr" target="_blank" rel="noopener noreferrer">
          https://faktaoklimatu.cz/infografiky/elektrina-cr
        </Link>
        . Jedná se o podil celkové produkce CO<sub>2</sub> a veškeré vyrobené energie v ČR.{' '}
      </>
    ),
    []
  )

  return (
    <Calculator
      versionId={'cz'}
      shareValues={shareValues}
      renderRegionInfo={() => <Link href="/sk">Přepnout na slovenskou verzi (beta)</Link>}
      renderCo2Info={renderCo2Info}
    />
  )
}

Index.getInitialProps = getShareData

export default Index
