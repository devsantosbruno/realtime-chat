"use client";

import { Modal } from "@components";
import Image from "next/image";

type ImageModalProps = {
	onClose: () => void;
	src?: string | null;
	isOpen?: boolean;
};

export function ImageModal({ onClose, isOpen, src }: ImageModalProps) {
	if (!src) {
		return null;
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-screen max-h-screen m-4"
		>
			<Image
				alt="Image"
				src={src}
				width={1920}
				height={1080}
				className="object-cover"
			/>
		</Modal>
	);
}
