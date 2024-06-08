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
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-80 h-80">
				<Image alt="Image" className="object-cover" src={src} fill />
			</div>
		</Modal>
	);
}
