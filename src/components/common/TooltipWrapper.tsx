"use client";
import React, { ReactNode } from "react";

interface TooltipWrapperProps {
	position: "top" | "bottom" | "left" | "right";
	content: ReactNode;
	children: ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
	position,
	content,
	children,
}) => (
	<div id='tooltip' className='relative cursor-pointer group'>
		{children}
		<span
			className={`absolute hidden group-hover:inline-block bg-zinc-950 shadow-[0_1px_4px_3px_rgba(15,65,61,_0.3)] text-white text-xs p-2 whitespace-nowrap rounded z-10 ${
				position === "top"
					? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
					: ""
			}  ${
				position === "bottom"
					? "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
					: ""
			} ${
				position === "left"
					? "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
					: ""
			}  ${
				position === "right"
					? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
					: ""
			}`}
		>
			{content}
		</span>
		<span
			className={`absolute hidden group-hover:inline-block border-[6px] ${
				position === "top"
					? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-zinc-950"
					: ""
			}  ${
				position === "bottom"
					? "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-zinc-950"
					: ""
			}  ${
				position === "left"
					? "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-l-zinc-950"
					: ""
			} ${
				position === "right"
					? "top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-r-zinc-950"
					: ""
			}`}
		></span>
	</div>
);

export default TooltipWrapper;
