import Button from "@material-ui/core/Button";
import {CandyMachine} from "@metaplex-foundation/js";
import {CircularProgress} from "@material-ui/core";
import styled from "styled-components";
import {useState} from "react";

export const CTAButton = styled(Button)`
  display: block !important;
  margin: 0 auto !important;
  background-color: #ff0022;
  min-width: 120px !important;
  font-size: 1em !important;
`;

export const MintButton = ({
  onMint,
  candyMachine,
  isMinting,
  isEnded,
  isActive,
  isSoldOut,
  limitReached,
}: {
  onMint: (quantityString: number) => Promise<void>;

  candyMachine: CandyMachine | undefined;
  isMinting: boolean;
  isEnded: boolean;
  isActive: boolean;
  isSoldOut: boolean;
  limitReached: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <CTAButton
      disabled={loading || isSoldOut || isMinting || isEnded || !isActive || limitReached}
      onClick={async () => {
        console.log("Minting...");
        setLoading(true);
        await onMint(1);
        setLoading(false);
      }}
      variant='contained'
    >
      {!candyMachine ? (
        "CONNECTING..."
      ) : isSoldOut ? (
        "SOLD OUT"
      ) : limitReached ? (
        "LIMIT REACHED"
      ) : isActive ? (
        isMinting || loading ? (
          <CircularProgress />
        ) : (
          "MINT"
        )
      ) : isEnded ? (
        "ENDED"
      ) : (
        "UNAVAILABLE"
      )}
    </CTAButton>
  );
};
