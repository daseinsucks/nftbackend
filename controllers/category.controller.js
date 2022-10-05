const Category = require("../models/category.model.js");

exports.getCategories = (req, res) => {
    Category.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages.",
            });
        });
};

// exports.generateCategories = (req, res) => {
//
//     const categories = [
//         {
//             id: 0,
//             name: 'Assets',
//             img_link: 'https://ipfs.io/ipfs/QmW4yw4dt6fziaQ6Q2gDvafmC9awkTjEZmKEDiEaxs1RfA',
//         },
//         {
//             id: 1,
//             name: '3D',
//             img_link: 'https://ipfs.io/ipfs/QmYfMFkXRg664Sn7WA1SzvBd96q3cUUMHfD24nsUoGFBVg',
//         },
//         {
//             id: 2,
//             name: '2D',
//             img_link: 'https://ipfs.io/ipfs/QmcmRPut51oVzNrz9RuGMoAszaUXW1p4XGDNT8win5tPqD',
//         },
//         {
//             id: 3,
//             name: 'Textures&Materials',
//             img_link: 'https://ipfs.io/ipfs/QmNSMo1NJ7DD3gdB4CBrvWmDHBaabQ2DWk5vf2oCwBJLDs',
//         },
//         {
//             id: 4,
//             name: 'Animations',
//             img_link: 'https://ipfs.io/ipfs/QmRNBeeHWMsAL3GeyBSd8K28aoiDFNNdF5nyeVyZT1MDCP',
//         },
//         {
//             id: 5,
//             name: 'GUI',
//             img_link: 'https://ipfs.io/ipfs/QmY1GMxFQKq5btZEC6V431Kif6htYNWfHyiGtTJUhMAj8w',
//         },
//         {
//             id: 6,
//             name: 'Particles&Effects',
//             img_link: 'https://ipfs.io/ipfs/QmNmeMr4dsqm7F6WpYBRHJzcmdXTyE8mjQ4AC3QtfgBxvU',
//         },
//         {
//             id: 7,
//             name: 'Unity',
//             img_link: 'https://ipfs.io/ipfs/QmcghVC8GnbkXJTVALg1wERnMMcAsxZb139nHskrKySabi',
//         },
//         {
//             id: 8,
//             name: 'Unreal Engine',
//             img_link: 'https://ipfs.io/ipfs/QmaGx9KGdBnWRV5MxkZNEsmapc3Vwgiv71k56eMzZmcQTq',
//         },
//         {
//             id: 9,
//             name: 'Characters',
//             img_link: 'https://ipfs.io/ipfs/QmZxViVNG9ykknufCNSHFbijyyhWswoYpxj654aTQbFPPR',
//         },
//         {
//             id: 10,
//             name: 'Props',
//             img_link: 'https://ipfs.io/ipfs/QmeNG1nVU2sYywtepXMEiU9pq96W6L9MKkXniiEomzVaGv',
//         },
//         {
//             id: 11,
//             name: 'Weapons',
//             img_link: 'https://ipfs.io/ipfs/QmNm4smS3fouPeh13WqE5qCoc9hKpHdLituFE9N9KNEQ2S',
//         },
//         {
//             id: 12,
//             name: 'Code',
//             img_link: 'https://ipfs.io/ipfs/QmPCrhF9W5bFAGDPskrqPct2qXNrLjhAh5r9biTNmEhc3W',
//         },
//         {
//             id: 13,
//             name: 'Visual Scripting',
//             img_link: 'https://ipfs.io/ipfs/QmR7boqRJNFoaUpmMNd7o8kc9VZFzvAKmTjgoH9d5fUwRq',
//         },
//         {
//             id: 14,
//             name: 'Blueprints',
//             img_link: 'https://ipfs.io/ipfs/QmeL78SynHSdQQ6npDCR3s3ttokCD15tUWirrUA4R6jAaV',
//         },
//         {
//             id: 15,
//             name: 'Templates',
//             img_link: 'https://ipfs.io/ipfs/QmXmNrtmWxBc1MCA7To4Z1zwFuuJPJiQTs6FxvnmLYFf68',
//         },
//         {
//             id: 16,
//             name: 'No Code',
//             img_link: 'https://ipfs.io/ipfs/QmeVJnyCeob46xzyq2HSYCTpmzPvzQCrHdf1uxpuEinHcu',
//         },
//         {
//             id: 17,
//             name: 'Bots',
//             img_link: 'https://ipfs.io/ipfs/QmT4ymQixsJ4A1iXsu6DjfqiTYFwkxUBWJRNyn7ueEe5va',
//         },
//         {
//             id: 18,
//             name: 'UX/UI',
//             img_link: 'https://ipfs.io/ipfs/Qmf6crKa96y4bCBg5E76nv8b2AfEodkL31hXFJGceWGVyQ',
//         },
//         {
//             id: 19,
//             name: 'VFX',
//             img_link: 'https://ipfs.io/ipfs/QmPUNmzTfkdtbSNJh6RhZ4SVV7HJHBv1vjkSxwyrYzE6UC',
//         },
//         {
//             id: 20,
//             name: 'Illustration',
//             img_link: 'https://ipfs.io/ipfs/QmXphYKsQFaRfmeGcVW8zYc6Lba3PZPdm82Tj643Y5e17L',
//         },
//         {
//             id: 21,
//             name: 'Desktop',
//             img_link: 'https://ipfs.io/ipfs/QmbkQTwRz86CanDgJJue5UcJVZ2ongfuFSCPVorKrjJcCr',
//         },
//         {
//             id: 22,
//             name: 'Mobile',
//             img_link: 'https://ipfs.io/ipfs/QmQ8go4qcZehvmdk9FrzoBKUc2Aiv9qLbHQ1mwz4FEVUuc',
//         },
//         {
//             id: 23,
//             name: 'Articles',
//             img_link: 'https://ipfs.io/ipfs/QmSPDchrNKX6jDmhiLg7LnXFGVu7m4GGGXAz2rq4yo4qtT',
//         },
//         {
//             id: 24,
//             name: 'Book',
//             img_link: 'https://ipfs.io/ipfs/QmRQ71iDDnmCgJq8iRTBrTpELZLWLQKcydrPiqcWkHFkL4',
//         },
//         {
//             id: 25,
//             name: 'AI',
//             img_link: 'https://ipfs.io/ipfs/QmdYFztJY6k2TfWM1DWFbe9tCo7odNadee6xBecotmu7q3',
//         },
//         {
//             id: 26,
//             name: 'AR',
//             img_link: 'https://ipfs.io/ipfs/QmfQxEZqnEu9QbHYhyc9msNNo4RXEgZ8xoNNrkb2nnmq2y',
//         },
//         {
//             id: 27,
//             name: 'VR',
//             img_link: 'https://ipfs.io/ipfs/QmVP8MfZnQCZzFH1Eor6AbRp2rAts4GanFwYbjK7NtSuUV',
//         },
//         {
//             id: 28,
//             name: 'Audio',
//             img_link: 'https://ipfs.io/ipfs/QmWwi8w2PJDczZqBXqjHi2sQJtWsJwDgKaoQagnp6hck1Z',
//         },
//         {
//             id: 29,
//             name: 'Sound Effects',
//             img_link: 'https://ipfs.io/ipfs/QmNXrfytr6snMcwd1M4mMsJgMduZdbTi13CV5smHUkkkGf',
//         }
//     ];
//
//     categories.forEach((category) => {
//         const createdCategory = new Category(category);
//         return createdCategory.save();
//     });
// }