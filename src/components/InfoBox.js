import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
export default function InfoBox({ title, cases ,isRed,active, total, ...props }) {
  return (
    <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent onClick={props.onClick}>
        <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
        <h2 className="infoBox__cases"> {cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}
