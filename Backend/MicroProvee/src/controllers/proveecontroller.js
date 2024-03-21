const Proveedor = require('../models/proveemodel');

// const createProveedor = async (req, res) => {
//     try {
//         const newProveedor = await Proveedor.create(req.body);
//         res.status(201).json({
//             ok: true,
//             proveedor: newProveedor
//         });
//     } catch (err) {
//         res.status(400).json({
//             ok: false,
//             error: err.message
//         });
//     }
// };

// const getProveedores = async (req, res) => {
//     try {
//         const proveedores = await Proveedor.find();
//         res.status(200).json({
//             ok: true,
//             count: proveedores.length,
//             proveedores
//         });
//     } catch (err) {
//         res.status(404).json({
//             ok: false,
//             error: err.message
//         });
//     }
// };


const getProveedorById = async (req, res) => {

    const id = parseInt(req.params.id);
    console.log(id)
    try {
        const proveedor = await Proveedor.findOne({ _id: id });
        console.log(proveedor)
        if (!proveedor) {
            return res.status(404).json({
                error: "El proveedor no existe"
            });
        } else {
            return res.status(200).json(proveedor);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};











// const updateProveedor = async (req, res) => {
//     try {
//         const updatedProveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//         if (!updatedProveedor) {
//             res.status(404).json({
//                 ok: false,
//                 message: 'Proveedor not found'
//             });
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 proveedor: updatedProveedor
//             });
//         }
//     } catch (err) {
//         res.status(404).json({
//             ok: false,
//             error: err.message
//         });
//     }
// };

// const deleteProveedor = async (req, res) => {
//     try {
//         await Proveedor.findByIdAndDelete(req.params.id);
//         res.status(204).json({
//             ok: true,
//             message: 'Proveedor successfully deleted'
//         });
//     } catch (err) {
//         res.status(404).json({
//             ok: false,
//             error: err.message
//         });
//     }
// };

module.exports = {
    // createProveedor,
    // getProveedores,
    getProveedorById,
    // updateProveedor,
    // deleteProveedor,
};


