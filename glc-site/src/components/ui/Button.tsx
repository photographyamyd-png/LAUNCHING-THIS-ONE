import {
  type ButtonHTMLAttributes,
  forwardRef,
  type Ref,
} from "react";

export const Button = forwardRef(function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: Ref<HTMLButtonElement>,
) {
  return <button ref={ref} type="button" {...props} />;
});
