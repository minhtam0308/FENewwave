import classBorrowCart from '../css/BorrowCart.module.scss'

const BorrowCart = () => {
    return (
        <>
            <div class={`${classBorrowCart.container} container mt-3`}>
                <h1><i class="bi bi-cart3 me-3"></i>Your Borrowing Cart</h1>


                <div class="row">

                    <div class="col-md-12 mb-4">
                        <div class={`${classBorrowCart.card} card`}>
                            <div class="card-body d-flex align-items-center p-4">
                                <div class={`${classBorrowCart.bookCover}`}>
                                    <i class="bi bi-book-half text-white" style={{ fontSize: "2.5rem" }}></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="card-title text-white mb-2">Book Title 1</h5>
                                    <p class="card-text mb-1"><i class="bi bi-person me-2"></i><strong>Author:</strong> John Doe</p>
                                    <p class="card-text mb-0"><i class="bi bi-tag me-2"></i><strong>Genre:</strong> Fiction</p>
                                </div>
                                <button class={`btn ${classBorrowCart.btnDangerModern} btn-sm`}><i class="bi bi-x-circle"></i> Remove</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row mt-5">
                    <div class="col-md-12">
                        <div class={`card ${classBorrowCart.summaryCard}`}>
                            <div class="card-body text-center p-4">
                                <h5 class="text-white mb-3"><i class="bi bi-receipt me-2"></i>Cart Summary</h5>
                                <p class="mb-2"><strong>Total Books:</strong> 2</p>
                                <p class="mb-3"><strong>Borrow Period:</strong> 14 days</p>
                                <button class={`btn ${classBorrowCart.btnModern} me-3`}><i class="bi bi-check-circle-fill me-2"></i>Borrow Now</button>
                                <button class={`btn btn-secondary ${classBorrowCart.btnModern}`}><i class="bi bi-arrow-left me-2"></i>Continue Browsing</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BorrowCart;