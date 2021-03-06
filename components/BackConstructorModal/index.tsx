import Image from 'next/image';
import { useMemo } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import useLeaderboard from '../../hooks/useLeaderboard';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';
import GarageCard from '../GarageCard';

const BackConstructorModal = ({
  constructorKey,
  constructorName,
  closeModal
}: IBackConstructorModalProps) => {
  const { garage } = useSelector((state: RootState) => state.garage);
  const { address, token } = useSelector((state: RootState) => state.auth);
  const { bootLoading } = useSelector((state: RootState) => state.boot);
  const { fetchUser } = useUser();

  async function backConstructor(constructor: string, itemId: number) {
    const response = await fetch(
      `/api/backconstructor?token=${token}&constructor=${constructor}&itemId=${itemId}`
    );
    const data = await response.json();
    await fetchUser(token);
    closeModal();
  }

  const matchingCars = useMemo(() => {
    return garage.filter((i: any) => i.name.split(' #')[0] === constructorName);
  }, [garage, constructorName]);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={() => closeModal()}
    >
      <div
        className="w-1/2 h-3/4 bg-gray z-30 rounded-lg p-10 overflow-y-scroll whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-white text-xl font-semibold">
          Select a car from your garage to support{' '}
          <span className="text-redOne">{constructorName}</span>
        </h1>
        <h1 className="text-white text-base">
          You can back <span className="text-redOne">{constructorName} </span>
          only with their own cars.
        </h1>
        {bootLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <TailSpin color="#EF473A" height={80} width={80} />
          </div>
        ) : garage.length > 0 ? (
          matchingCars.length > 0 ? (
            matchingCars.map((ownedItem: any) => (
              <div
                key={ownedItem.itemId}
                className="grid grid-cols-2 gap-10 mt-10"
              >
                <span
                  onClick={() =>
                    backConstructor(constructorKey, ownedItem.itemId)
                  }
                >
                  <GarageCard
                    key={
                      ownedItem.tokenId ? ownedItem.tokenId : ownedItem.itemId
                    }
                    NFT={ownedItem}
                  />
                </span>
              </div>
            ))
          ) : (
            <NoMatchingCarUI constructorName={constructorName} />
          )
        ) : (
          <EmptyGarageUI />
        )}
      </div>
    </div>
  );
};

export default BackConstructorModal;

interface IBackConstructorModalProps {
  constructorKey: string;
  constructorName: string;
  closeModal: Function;
}

const EmptyGarageUI = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white text-center font-semibold text-lg">
        No cars in your garage yet!
      </h1>
    </div>
  );
};

const NoMatchingCarUI = ({ constructorName }: any) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white text-center font-semibold text-lg">
        No <span className="text-redOne">{constructorName} </span>cars in your
        garage yet!
      </h1>
    </div>
  );
};
