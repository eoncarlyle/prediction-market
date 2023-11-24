import { useState, useContext } from "react";
import { Form as RRForm } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { priceNumberFormat } from "../../util/Numeric";
import shareChangeHandlerCreator from "../../util/ShareChangeHandlerCreator";
import PositionDirection from "../../model/PositionDirection";
import TransactionValidation from "../../model/TransactionValidation";
import processSellForm from "../../util/ProcessSellForm";
import OrderInformation from "./OrderInformation";
import MarketDetailContext from "../../util/MarketDetailContext";
import MarketDetailContextValue from "../../model/MarketDetailContextValue";

import styles from "../../style/TransactionForm.module.css";
import MarketTransactionModal from "./MarketTransactionModal";
import TransactionType from "../../model/TransactionType";

//TODO pm-22: figure out why validation and feedback aren't working as intended
export default function SellForm() {
  const marketDetailContextValue = useContext(MarketDetailContext) as MarketDetailContextValue;
  const { marketReturnData, order, setOrder } = marketDetailContextValue;
  const { market, salePriceList } = marketReturnData;

  const transactionType = TransactionType.Sale;
  const outcome = market.outcomes[order.outcomeIndex];
  const outcomeSalePriceList =
    salePriceList[order.outcomeIndex][order.positionDirection === PositionDirection.YES ? 0 : 1];
  const sharePrice =
    order.shares > outcomeSalePriceList.length ? outcomeSalePriceList[-1] : outcomeSalePriceList[order.shares - 1];

  const directionCost = order.positionDirection === PositionDirection.YES ? sharePrice : 1 - sharePrice;
  const inputDisabled = outcomeSalePriceList.length === 0;

  const [transactionValidation, setTransactionValidation] = useState<TransactionValidation>({
    valid: true,
    showModal: false,
    message: "",
    order: order,
  });

  if (transactionValidation.order !== order) {
    setTransactionValidation({
      valid: transactionValidation.valid,
      showModal: false,
      message: "",
      order: order,
    });
  }

  const handleSubmit = () => {
    setTransactionValidation({
      valid: true,
      showModal: true,
      message: "",
      order: order,
    });
  };

  const handleClose = () => {
    setTransactionValidation({
      valid: transactionValidation.valid,
      showModal: false,
      message: transactionValidation.message,
      order: order,
    });
  };

  const shareButtonClickHandler = () =>
    setTransactionValidation({
      valid: true,
      showModal: false,
      message: "",
      order: order,
    });

  return (
    <>
      <RRForm className={styles.transactionForm} onSubmit={handleSubmit}>
        <Container className={styles.transactionFormContainer}>
          <OrderInformation
            transactionType={transactionType}
            claim={outcome.claim}
            direction={order.positionDirection}
            availableShares={outcomeSalePriceList.length}
          />
          <Row>
            <Col>Shares to Sell</Col>
            <Col>
              <Form.Control
                name="shares"
                type="number"
                step="1"
                min="1"
                max={outcomeSalePriceList.length}
                placeholder={String(order.shares)}
                onChange={shareChangeHandlerCreator(order, setOrder)}
                onClick={shareButtonClickHandler}
                isInvalid={!transactionValidation.valid}
                isValid={transactionValidation.valid && transactionValidation.message !== ""}
                disabled={inputDisabled}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">{transactionValidation.message}</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">{transactionValidation.message}</Form.Control.Feedback>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className={styles.marketButton} disabled={inputDisabled}>
            Sell
          </Button>
          <Row>
            <Col>Proceeds</Col>
            <Col>{priceNumberFormat(order.shares * directionCost)} CR</Col>
          </Row>
        </Container>
      </RRForm>

      <MarketTransactionModal
        transactionType={TransactionType.Sale}
        showModal={transactionValidation.showModal}
        order={order}
        outcomeClaim={outcome.claim}
        directionCost={directionCost}
        handleClose={handleClose}
        handleSubmit={processSellForm(market, order, sharePrice, setTransactionValidation, setOrder)}
      />
    </>
  );
}
