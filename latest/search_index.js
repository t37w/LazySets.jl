var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#LazySets.jl-1",
    "page": "Home",
    "title": "LazySets.jl",
    "category": "section",
    "text": "DocTestFilters = [r\"[0-9\\.]+ seconds \\(.*\\)\"]LazySets is a Julia package for calculus with convex sets.The aim is to provide a scalable library for solving complex set-based problems, such as those encountered in differential inclusions or reachability analysis techniques in the domain of formal verification. Typically, one is confronted with a set-based recurrence with a given initial set and/or input sets, and for visualization purposes the final result has to be obtained through an adequate projection onto low-dimensions. This library implements types to construct set formulas and methods to efficiently and accurately approximate the projection in low-dimensions.Pages = [\"index.md\"]"
},

{
    "location": "index.html#Introduction-1",
    "page": "Home",
    "title": "Introduction",
    "category": "section",
    "text": "In this package we describe convex sets lazily (i.e., symbolically). This way we provide an exact but abstract representation, in principle for any common convex set class or operation between sets. Concrete information is obtained through evaluating the set in specific directions. More precisely, each concrete subtype mathcalX of the abstract type LazySet exports a method to calculate its support vector sigma(d mathcalX) in a given (arbitrary) direction d in mathbbR^n. Representing sets exactly but lazily has the advantage of being able to perform only the required operations on-demand.For very long sequences of computations (e.g., set-based recurrences with tens of thousands of elements), it is useful to combine both lazy and concrete representations such as polyhedral approximations. All this is easy to do with LazySets. Moreover, we provide a specialized module for handling Cartesian decomposition of two-dimensional projections. The projection can be taken to the desired precision using an iterative refinement method."
},

{
    "location": "index.html#Example-1",
    "page": "Home",
    "title": "Example",
    "category": "section",
    "text": "Let mathcalX_0 subset mathbbR^1000 be the Euclidean ball of center (1 ldots 1) and radius 01 in dimension n=1000. Given a real matrix A in mathbbR^1000 times 1000, suppose that we are interested in the equationmathcalY = CH(e^A  mathcalX_0   BmathcalU mathcalX_0)where CH is the convex hull operator,  denotes Minkowski sum, mathcalU is a ball in the infinity norm centered at zero and radius 12, and B is a linear map of the appropriate dimensions. This equation typically arises in the study of discrete approximation models for reachability of continuous systems, see for example SpaceEx: Scalable verification of hybrid systems.For concreteness, we take A to be a random matrix with probability 1 of any entry being nonzero. Suppose that the input set mathcalU is two-dimensional, and that the linear map B is random. Finally, let δ = 0.1. Using LazySets, we can define this problem as follows:julia> using LazySets;\n\njulia> A = sprandn(1000, 1000, 0.01);\n\njulia> δ = 0.1;\n\njulia> X0 = Ball2(ones(1000), 0.1);\n\njulia> B = randn(1000, 2);\n\njulia> U = BallInf(zeros(2), 1.2);\nThe @time macro reveals that building mathcalY with LazySets is instantaneous:julia> @time Y = CH(SparseMatrixExp(A * δ) * X0 + δ * B * U, X0);\n0.000022 seconds (13 allocations: 16.094 KiB)By asking for the concrete type of Y, we see that it has a convex hull type, parameterized by the types of its arguments, corresponding to the mathematical formulation:julia> typeof(Y)\nLazySets.ConvexHull{Float64,LazySets.MinkowskiSum{Float64,LazySets.ExponentialMap{Float64,LazySets.Ball2{Float64}},LazySets.LinearMap{Float64,Float64}},LazySets.Ball2{Float64}}Now suppose that we are interested in observing the projection of mathcalY onto the variables number 1 and 500. First we define the 21000 projection matrix and apply it to mathcalY as a linear map (i.e., from the left). Second, we use the overapproximate method:julia> proj_mat = [[1. zeros(1, 999)]; [zeros(1, 499) 1. zeros(1, 500)]];\n\njulia> @time res = Approximations.overapproximate(proj_mat * Y);\n0.064034 seconds (1.12 k allocations: 7.691 MiB)We have calculated a box overapproximation of the exact projection onto the (x_1 x_500) plane. Notice that it takes about 0.064 seconds for the whole operation, allocating less than 10MB of RAM. Let us note that if the set operations were done explicitly, this would be much (!) slower. For instance, already the explicit computation of the matrix exponential would have cost 10x more, and allocated around 300MB. For even higher n, an evaluation will probably run out of RAM. But this is doable with LazySets because the action of the matrix exponential on the set is only evaluated along the directions of interest. Similar comments apply to the Minkowski sum above.We can visualize the result using plot, as shown below (left-most plot).(Image: assets/example_ch.png)In the second and third plots, we have used a refined method that allows to specify a prescribed accuracy for the projection (in terms of the Hausdorff distance). For the theoretical background, see this reference. It can be passed as a second argument to overapproximate.Error tol. time (s) memory (MB)\n∞ (no refinement) 0.022 5.27\n1e-1 0.051 7.91\n1e-3 0.17 30.3This table shows the runtime and memory consumption for different error tolerances, and the results are shown in three plots of above, from left to right. When passing to a smaller tolerance, the corners connecting edges are more \"rounded\", at the expense of computational resources, since more support vectors have to be evaluated."
},

{
    "location": "index.html#Features-1",
    "page": "Home",
    "title": "Features",
    "category": "section",
    "text": "The core functionality of LazySets is:Lazy (i.e., symbolic) types for several classes of convex sets such as balls in different norms, polygons in constraint or vertex representation, zonotopes, special types such as lines and linear constraints, hyperrectangles, and high-dimensional polyhedra.\nLazy implementations for most commonly used set operations, e.g., Minkowski sum, Cartesian product, convex hull and interval hull approximations, and linear and exponential maps.On top of the previous basic type representations and operations, LazySets can be used to:Efficiently evaluate the support vector of nested lazy sets.\nCartesian decomposition of lazy sets using two-dimensional projections.\nFast overapproximation of an exact set using a polyhedral approximation, to the desired accuracy.\nExtensive visualization capabilities through the Plots.jl framework."
},

{
    "location": "index.html#Manual-Outline-1",
    "page": "Home",
    "title": "Manual Outline",
    "category": "section",
    "text": "Pages = [\n    \"man/getting_started.md\",\n    \"man/polyhedral_approximations.md\",\n    \"man/decompose_example.md\",\n    \"man/fast_2d_LPs.md\",\n    \"man/iterative_refinement.md\",\n    \"man/interval_hulls.md\",\n    \"man/convex_hulls.md\",\n    \"man/reach_zonotopes.md\",\n    \"man/reach_zonotopes_hybrid.md\",\n    \"man/concrete_polyhedra.md\"\n]\nDepth = 2"
},

{
    "location": "index.html#Library-Outline-1",
    "page": "Home",
    "title": "Library Outline",
    "category": "section",
    "text": "Pages = [\n    \"lib/interfaces.md\",\n    \"lib/representations.md\",\n    \"lib/operations.md\",\n    \"lib/conversion.md\",\n    \"lib/approximations.md\",\n    \"lib/utils.md\"\n]\nDepth = 2"
},

{
    "location": "man/getting_started.html#",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "man/getting_started.html#Getting-Started-1",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "section",
    "text": "In this section we review the recommended setup to start working with this package.Pages = [\"getting_started.md\"]"
},

{
    "location": "man/getting_started.html#Setup-1",
    "page": "Getting Started",
    "title": "Setup",
    "category": "section",
    "text": "This package requires Julia v0.6 or later. Refer to the official documentation on how to install it for your system. Below we explain the steps for setting up LazySets on your system and checking that it builds correctly."
},

{
    "location": "man/getting_started.html#Installation-1",
    "page": "Getting Started",
    "title": "Installation",
    "category": "section",
    "text": "To install LazySets, use the following command inside Julia\'s REPL:Pkg.clone(\"https://github.com/JuliaReach/LazySets.jl\")The dependencies of LazySets, such as Expokit.jl – which provides lazy matrix exponentiation routines – are automatically installed through Julia\'s package manager. The full list of dependencies is specified in the REQUIRE file."
},

{
    "location": "man/getting_started.html#Workflow-tips-1",
    "page": "Getting Started",
    "title": "Workflow tips",
    "category": "section",
    "text": "There are different ways to use Julia: from the terminal, from the Julia REPL, from IJulia (i.e., Jupyter notebook), from Juno, etc. If you do not have a preferred choice, we recommend using LazySets through IJulia; one reason is that the visualization is conveniently embedded into the notebook, and it can be exported into different formats, among other benefits. On the other hand, for development purposes you probably want to use the REPL or the Juno environment."
},

{
    "location": "man/getting_started.html#Updating-1",
    "page": "Getting Started",
    "title": "Updating",
    "category": "section",
    "text": "After working with LazySets for some time, you may want to get the newest version. For this you can use the following command (e.g., from the REPL):Pkg.checkout(\"LazySets\")That will check out the latest version in the master branch, and precompile it the next time you enter a session and execute using LazySets."
},

{
    "location": "man/polyhedral_approximations.html#",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral Approximations",
    "category": "page",
    "text": ""
},

{
    "location": "man/polyhedral_approximations.html#Polyhedral-Approximations-1",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral Approximations",
    "category": "section",
    "text": "In this section we review the mathematical notation and results from convex geometry that are used throughout LazySets.Pages = [\"polyhedral_approximations.md\"]\nDepth = 3"
},

{
    "location": "man/polyhedral_approximations.html#Preliminaries-1",
    "page": "Polyhedral Approximations",
    "title": "Preliminaries",
    "category": "section",
    "text": "Let us introduce some notation. Let mathbbI_n be the identity matrix of dimension ntimes n. For p geq 1, the p-norm of an n-dimensional vector x in mathbbR^n is denoted Vert x Vert_p."
},

{
    "location": "man/polyhedral_approximations.html#Support-Function-1",
    "page": "Polyhedral Approximations",
    "title": "Support Function",
    "category": "section",
    "text": "The support function is a basic notion for approximating convex sets. Let mathcalX subset mathbbR^n be a compact convex set. The support function of mathcalX is the function rho_mathcalX  mathbbR^nto mathbbR, defined asrho_mathcalX(ell) = maxlimits_x in mathcalX ell^mathrmT xWe recall the following elementary properties of the support function.Proposition. For all compact convex sets mathcalX, mathcalY in mathbbR^n, for all ntimes n real matrices M, all scalars lambda, and all vectors ell in mathbbR^n, we have:beginalign*\nquad rho_lambdamathcalX (ell) = rho_mathcalX (lambda ell)\ntext and  rho_lambdamathcalX (ell) = lambda rho_mathcalX (ell) text if  lambda  0 tag11 1mm\n\nquad rho_MmathcalX (ell) = rho_mathcalX (M^mathrmT ell) tag12 1mm\n\nquad rho_mathcalX oplus mathcalY (ell) = rho_mathcalX (ell) + rho_mathcalY (ell) tag13 1mm\n\nquad rho_mathcalX times mathcalY (ell) = ell^mathrmT sigma_mathcalX times mathcalY(ell) tag14 1mm\n\nquad rho_mathrmCH(mathcalXcupmathcalY) (ell) = max (rho_mathcalX (ell) rho_mathcalY (ell)) tag15\nendalign*"
},

{
    "location": "man/polyhedral_approximations.html#Support-Vector-1",
    "page": "Polyhedral Approximations",
    "title": "Support Vector",
    "category": "section",
    "text": "The farthest points of mathcalX in the direction ell are the support vectors denoted sigma_mathcalX(ell). These points correspond to the optimal points for the support function, i.e.,sigma_mathcalX(ell) =  x in mathcalX  ell^mathrmT x  = rho_mathcalX(ell)  Since all support vectors in a given direction evaluate to the same value of the support function, we often speak of the support vector, where the choice of any support vector is implied.(Image: Illustration of the support function and the support vector)Proposition 2. Under the same conditions as in Proposition 1, the following hold:beginalign*\nquad sigma_lambdamathcalX (ell) = lambda sigma_mathcalX (lambda ell) tag21 1mm\n\nquad sigma_MmathcalX (ell) = Msigma_mathcalX (M^mathrmT ell) tag22 1mm\n\nquad sigma_mathcalX oplus mathcalY (ell) = sigma_mathcalX (ell) oplus sigma_mathcalY (ell) tag23 1mm\n\nquad sigma_mathcalX times mathcalY (ell) = (sigma_mathcalX(ell_1) sigma_mathcalY(ell_2)) text where  ell = (ell_1 ell_2) tag24 1mm\n\nquad sigma_mathrmCH(mathcalXcupmathcalY) (ell) =\ntextargmax_x y (ell^mathrmT x ell^mathrmT y)\ntext where  x in sigma_mathcalX(ell) y in sigma_mathcalY(ell) tag25\nendalign*"
},

{
    "location": "man/polyhedral_approximations.html#Polyhedral-approximation-of-a-convex-set-1",
    "page": "Polyhedral Approximations",
    "title": "Polyhedral approximation of a convex set",
    "category": "section",
    "text": "The projection of a set into a low dimensional space (a special case of M mathcalX) can be conveniently evaluated using support functions, since sigma_MmathcalX(ell) = sigma_mathcalX(M^Tell). Moreover, for some classical convex sets such as unit balls in the infinity norm, in the 2-norm, or polyhedra in constraint representation, the support functions can be efficiently computed. For example, the support function of the unit ball mathcalB_p^n is rho_mathcalB_p^n(ell) = VertellVert_fracpp-1Given directions ell_1ldotsell_m, a tight overapproximation of mathcalX is the outer polyhedron given by the constraintsbeginequation*\nquad bigwedge_i ell_i^T x leq rho_mathcalX(ell_i) tag3\nendequation*For instance, a bounding box involves evaluating the support function in 2n directions. To quantify this, we use the following distance measure.A set mathcalhatX is within Hausdorff distance varepsilon of mathcalX if and only ifmathcalhatX subseteq mathcalX oplus varepsilonmathcalB_p^n\ntext and  mathcalX subseteq mathcalhatX oplus\nvarepsilonmathcalB_p^nThe infimum varepsilon geq 0 that satisfies the above equation is called the Hausdorff distance between mathcalX and mathcalhatX with respect to the p-norm, and is denoted d_H^pbigl(mathcalXmathcalhatXbigr).Another useful characterization of the Hausdorff distance is the following. Let mathcalX mathcalY subset mathbbR^n be polytopes. Thend^p_H(mathcalX mathcalY) = max_ell in mathcalB_p^n\nleftrho_mathcalY(ell) - rho_mathcalX(ell)rightIn the special case mathcalX subseteq mathcalY, the absolute value can be removed.By adding directions using Lotov\'s method (s. below), the outer polyhedron in (3) is within Hausdorff distance varepsilon VertXVert_p for mathcalOleft(frac1varepsilon^n-1right) directions, and this bound is optimal. It follows that accurate outer polyhedral approximations are possible only in low dimensions. For n=2, the bound can be lowered to mathcalOleft(frac1sqrtvarepsilonright) directions, which is particularly efficient and the reason why we chose to decompose the system into subsystems of dimension 2."
},

{
    "location": "man/polyhedral_approximations.html#Lotov\'s-method-1",
    "page": "Polyhedral Approximations",
    "title": "Lotov\'s method",
    "category": "section",
    "text": "An overapproximation of the projections of a polyhedron given in constraint form can be obtained using Lotov\'s method; this is a particularly effective method in two dimensions. Lotov\'s algorithm proceeds as follows. Starting with at least n linearly independent template directions, compute an outer approximation. From the corresponding support vectors, compute an inner approximation, as the convex hull of the support vectors. Now compute the facet normals of the inner approximation, and the distance between the facets of the inner and the vertices of the outer approximation. Finally, pick the facet normal with the largest distance, and add it to the template directions. This procedure is repeated until the distance is smaller than the desired error.For more details we refer to the paper."
},

{
    "location": "man/decompose_example.html#",
    "page": "Decomposing an Affine Map",
    "title": "Decomposing an Affine Map",
    "category": "page",
    "text": ""
},

{
    "location": "man/decompose_example.html#Decomposing-an-Affine-Map-1",
    "page": "Decomposing an Affine Map",
    "title": "Decomposing an Affine Map",
    "category": "section",
    "text": "In this section we present an illustrative example of the decomposed image of a linear map.Pages = [\"decompose_example.md\"]\nDepth = 3"
},

{
    "location": "man/decompose_example.html#Preliminaries:-Polygon,-Linear-Map,-and-Plotting-1",
    "page": "Decomposing an Affine Map",
    "title": "Preliminaries: Polygon, Linear Map, and Plotting",
    "category": "section",
    "text": "Consider the matrix-valued function () = beginpmatrix cos ()  -sin ()  sin ()  cos () endpmatrix,    .using LazySets, LazySets.Approximations, Plots\n\nΦ(theta) = [cos(theta) -sin(theta); sin(theta) cos(theta)]Now define an arbitrary convex polygon with five vertices with operatornameCH denoting the convex hull operation,mathcalX = operatornameCHbig( (1 05) (11 02) (14 03) (17 05) (14 08) big)This set can be defined as:X = VPolygon([[1.0, 0.5], [1.1, 0.2], [1.4, 0.3], [1.7, 0.5], [1.4, 0.8]])note: Note\nYou can as well define the convex hull of the one element sets (singletons) viaC = CHArray([Singleton([1.0, 0.5]), Singleton([1.1, 0.2]), Singleton([1.4, 0.3]), Singleton([1.7, 0.5]), Singleton([1.4, 0.8])])Observe that C is just a lazy convex hull, whereas X is a polygon in vertex representation.Applying the linear map (4)  mathcalX, we get a new polygon mathcalX which is the counter-clockwise turn of mathcalX by  triangleq 45. In this package the linear map is not computed explicitly but only wrapped in a LinearMap instance.Xp = Φ(pi/4) * X\n\ntypeof(Xp)Let us plot the two polygons, mathcalX in green and mathcalX in blue.example = plot(X, color=\"green\")\n\nplot!(example, Xp, 1e-2, color=\"blue\")Note that we have passed 1e-2 as additional argument for the LinearMap set (mathcalX) because by default such a set is just plotted as its box (or hyperrectangle) approximation. The value 1e-2 is the precision up to which the set is (over-)approximated with a polgon, which in this case is sufficient to obtain the actual set again."
},

{
    "location": "man/decompose_example.html#Cartesian-Decomposition-1",
    "page": "Decomposing an Affine Map",
    "title": "Cartesian Decomposition",
    "category": "section",
    "text": "Next we want to decompose mathcalX into a Cartesian product of intervals. That is, we project it to the x-axis and y-axis and then compose these intervals again: hatmathcalX = hatmathcalX_1 times hatmathcalX_2.Xhat = overapproximate(X)  # approximation of X with an axis-aligned polygon\n\nplot!(example, Xhat, color=\"gray\", alpha=0.3)"
},

{
    "location": "man/decompose_example.html#Decomposed-Image-of-a-Linear-Map-1",
    "page": "Decomposing an Affine Map",
    "title": "Decomposed Image of a Linear Map",
    "category": "section",
    "text": "Now let us compute the linear map for the box approximation, and let us call it mathcalY = (4)  hatmathcalX. This will be a diamond-like shape (the box turned by 45°).Y = Φ(pi/4) * Xhat\n\nplot!(example, Y, 1e-2, color=\"yellow\", alpha=0.3)However, we want our approximation be again a Cartesian product of intervals, so we have to overapproximate this diamond-like shape again: hatmathcalY = hatmathcalX = hatmathcalX_1 times hatmathcalX_2Xhatp = overapproximate(Y)\n\nplot!(example, Xhatp, 1e-2, color=\"gray\", alpha=0.3)As we can see, the resulting box hatmathcalX is not a tight overapproximation of mathcalX. We can, however, gain precision by reducing the angle by which we turn the set, e.g., making two smaller turns. Why not try it out?"
},

{
    "location": "man/fast_2d_LPs.html#",
    "page": "Fast 2D LPs",
    "title": "Fast 2D LPs",
    "category": "page",
    "text": ""
},

{
    "location": "man/fast_2d_LPs.html#Fast-2D-LPs-1",
    "page": "Fast 2D LPs",
    "title": "Fast 2D LPs",
    "category": "section",
    "text": "In this section we explain the implementation of the support vector for the case of convex polygons.Pages = [\"fast_2d_LPs.md\"]\nDepth = 3"
},

{
    "location": "man/fast_2d_LPs.html#Introduction-1",
    "page": "Fast 2D LPs",
    "title": "Introduction",
    "category": "section",
    "text": "Since vectors in the plane can be ordered by the angle with respect to the positive real axis, we can efficiently evaluate the support vector of a polygon in constraint representation by comparing normal directions, provided that its edges are ordered.This is illustrated in the following picture.(Image: ../assets/intuition2dlp.png)If the normal directions of the polygon are ordered, the support vector in any direction always lies between two consecutive edges, a_i+1 preceq ell preceq a_i. Here we use the symbol preceq to compare directions, where the increasing direction is counter-clockwise.The following lemma provides an algorithm to find the support vector."
},

{
    "location": "man/fast_2d_LPs.html#Lemma-1",
    "page": "Fast 2D LPs",
    "title": "Lemma",
    "category": "section",
    "text": "Let mathcalX be a polygon described by m linear constraints a_i^T x leq b_i, ordered by the normal vectors (a_i), i.e., a_i preceq a_i+1 for all i in 1ldotsm, where we identify a_m+1 with a_1. Let ell in mathbbR^2 setminus mathbf0_2. Then there exists i in 1dotsm such that a_i preceq ell preceq a_i+1 and every optimal solution barx of the linear program rho_mathcalX(ell) = max ell^T x  x in mathcalX satisfies barx in x  a_i^T x leq b_i cap x  a_i+1^T x leq b_i+1"
},

{
    "location": "man/fast_2d_LPs.html#Algorithm-1",
    "page": "Fast 2D LPs",
    "title": "Algorithm",
    "category": "section",
    "text": "First define a <= b as the comparison of directions using polar angles, with 0 being the direction (1, 0).Now assume that the constraints in a polytope mathcalX are given as a_i x + b_i.The following pseudocode explains how to find barx.σ(d, X):\n    let i be the smallest index such that a_{i-1} <= d and a_i > d\n    return the vertex at the intersection of constraints i and i-1"
},

{
    "location": "man/iterative_refinement.html#",
    "page": "Iterative Refinement",
    "title": "Iterative Refinement",
    "category": "page",
    "text": ""
},

{
    "location": "man/iterative_refinement.html#Iterative-Refinement-1",
    "page": "Iterative Refinement",
    "title": "Iterative Refinement",
    "category": "section",
    "text": "This section of the manual describes an approximation method for an arbitrary two-dimensional convex set S and a given error bound  using support vectors. The basic idea is to add new supporting directions whenever the approximation error is still bigger than .Pages = [\"iterative_refinement.md\"]\nDepth = 3CurrentModule = LazySets.Approximations\nDocTestSetup = quote\n    using LazySets, Plots, LazySets.Approximations\nend"
},

{
    "location": "man/iterative_refinement.html#Local-approximations-1",
    "page": "Iterative Refinement",
    "title": "Local approximations",
    "category": "section",
    "text": "The polygonal approximation of an arbitrary lazy convex set S is represented by a list of local approximations or refinements. More precisely, a local approximation is a triple (p_1 p_2 q), where:p_1 and p_2 belong to S\nthe segments (p_1 q) and (p_2 q) belong to support lines of SSince S is assumed to be convex, the segment (p_1 p_2) is inside S. Taking each support line (p_1 q) of a given list of local approximations of S, we can build a polygon in constraint representation that overapproximates S.The type LocalApproximation{N} implements a local approximation; it is parametric in the numeric type N, and also contains additional information regarding the quality of the approximation: The refinable field is a boolean that is true whenever the approximation can be improved, and err is an upper bound on the exact Hausdorff distance of the approximation with respect to the exact set S.Given the unit ball in the 2-norm, below we plot the local approximation along the East and North directions.using LazySets, Plots, LazySets.Approximations\n\nb = Ball2(zeros(2), 1.)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\n\nplot!(Singleton([1.0, 0.0]), annotations=(1.1, 0.1, text(\"p1\")), color=\"green\")\nplot!(Singleton([0.0, 1.0]), annotations=(0.1, 1.1, text(\"p2\")), color=\"green\")\nplot!(Singleton([1.0, 1.0]), annotations=(1.09, 1.1, text(\"q\")))\nplot!(Singleton([0.0, 0.0]), annotations=(0.1, 0.0, text(\"0\")), color=\"green\")\nplot!(annotations=(1.4, 0.1, text(\"d1\")))\nplot!(annotations=(0.1, 1.4, text(\"d2\")))\nplot!(annotations=(0.75, 0.8, text(\"ndir\")))\n\nplot!(x->x, x->1., -0.8, 1.3, line=1, color=\"black\", linestyle=:dash)\nplot!(x->1., x->x, -0.8, 1.3, line=1, color=\"black\", linestyle=:dash)\nplot!(x->x+1, x->0., 0.0, 0.4, line=1, color=\"red\", linestyle=:solid, arrow=true)\nplot!(x->0., x->x+1, 0.0, 0.4, line=1, color=\"red\", linestyle=:solid, arrow=true)\nplot!(x->-x, x->x+1, -1.2, .2, line=1., color=\"black\", linestyle=:dashdot)\nplot!(x->x+.6, x->x+.6, -.1, .08, line=1, color=\"red\", linestyle=:solid, arrow=true)We can instantiate and append this approximation to a fresh PolygonalOverapproximation object, which is a type that wraps a set and a list of LocalApproximations. The approximation is refinable, since it can be \"split\" along ndir, where ndir is the direction normal to the line (p_1 p_2) (shown dash-dotted in the figure), providing two approximations which are closer to the given set in Hausdorff distance.import LazySets.Approximations:PolygonalOverapproximation, addapproximation!\n\nΩ = PolygonalOverapproximation{Float64}(b)\np1, d1, p2, d2 = [1.0, 0.0], [1.0, 0.0], [0.0, 1.0], [0.0, 1.0]\napprox_EAST_NORTH = addapproximation!(Ω, p1, d1, p2, d2)\n\napprox_EAST_NORTH.refinableThe associated error is sqrt2-10414213, which is the distance between the point q and the intersection between the line (0 q) and the circle. Actually this point corresponds to the support vector of the set b along ndir.approx_EAST_NORTH.errThe refined approximation is computed next."
},

{
    "location": "man/iterative_refinement.html#Refinement-1",
    "page": "Iterative Refinement",
    "title": "Refinement",
    "category": "section",
    "text": "Basically, the refinement step consists of splitting the local approximation (p_1 p_2 q) into two local approximations (p_1 s q) and (s p_2 q), where s is the support vector of S along ndir.To illustrate this, first let\'s add the remaining three approximations to Ω along the canonical directions, to build a box overapproximation of b.import LazySets.Approximations: refine, tohrep\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\n\n# initialize box directions\nDIR_EAST, DIR_NORTH, DIR_WEST, DIR_SOUTH = [1., 0.], [0., 1.], [-1., 0.], [0., -1.]\npe, pn, pw, ps = σ(DIR_EAST, b), σ(DIR_NORTH, b), σ(DIR_WEST, b), σ(DIR_SOUTH, b)\n\naddapproximation!(Ω, pn, DIR_NORTH, pw, DIR_WEST)\naddapproximation!(Ω, pw, DIR_WEST, ps, DIR_SOUTH)\naddapproximation!(Ω, ps, DIR_SOUTH, pe, DIR_EAST)\n\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")Next we refine the first approximation of the list.(r1, r2) = refine(Ω, 1)\nΩ.approx_list[1] = r1\ninsert!(Ω.approx_list, 2, r2)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")We call r1 and r2 the right and left approximations respectively, since they are saved in counter-clockwise order. We can check that the first two approximations are still refinable.Ω.approx_list[1].refinable,  Ω.approx_list[2].refinableHence, we can make again a refinement of that approximation.(r1, r2) = refine(Ω, 1)\nΩ.approx_list[1] = r1\ninsert!(Ω.approx_list, 2, r2)\n\nplot(b, 1e-3, aspectratio=1, alpha=0.3)\nplot!(tohrep(Ω), alpha=0.2, color=\"orange\")The criterion for an approximation being refinable is that we can properly define a normal direction ndir. This boils down to checking for the following \"degenerate\" cases:p_1 and p_2 overlap.\np_1 and q overlap.\np_2 and q overlap.Moreover, we include the condition approx_error > TOL where TOL is the floating point epsilon in the given numerical precision."
},

{
    "location": "man/iterative_refinement.html#Algorithm-1",
    "page": "Iterative Refinement",
    "title": "Algorithm",
    "category": "section",
    "text": "Having presented the individual steps, we give the pseudocode of the iterative refinement algorithm, see approximate(S, ε).The algorithm consists of the following steps:Initialization. The approximation is initialized with box directions, i.e. it starts with four LocalApproximation objects. Let i=1.\nRefinement loop. If the local approximation at index i has an error greater than the threshold ε, then refine. Otherwise, increment i <- i+1.\nRedundancy check. Insert the refined right approximation at position i, and check whether the left approximation is redundant or not with respect to the one at position i+1. Checking for redundancy amounts to checking for overlap of both p1 and q. Then, either substitute at i+1 or insert (keeping the approximation at i+1) depending on the redundancy check.\nStopping criterion. Terminate if the index i exceeds the current length of the approximations list; otherwise continue with step 2.Observe that the algorithm finishes when all approximations are such that their associated error is smaller than ε, hence the Hausdorff distance between S and its polygonal overapproximation is no greater than ε."
},

{
    "location": "man/iterative_refinement.html#Example-1",
    "page": "Iterative Refinement",
    "title": "Example",
    "category": "section",
    "text": "As a final example consider the iterative refinement of the ball b for different values of the approximation threshold ε.import LazySets.Approximations:overapproximate, approximate\n\np0 = plot(b, 1e-6, aspectratio=1)\np1 = plot!(p0, overapproximate(b, 1.), alpha=0.4, aspectratio=1)\n\np0 = plot(b, 1e-6, aspectratio=1)\np2 = plot!(p0, overapproximate(b, 0.1), alpha=0.4, aspectratio=1)\n\np0 = plot(b, 1e-6, aspectratio=1)\np3 = plot!(p0, overapproximate(b, 0.01), alpha=0.4, aspectratio=1)\n\nplot(p1, p2, p3, layout=(1, 3))We can check that the error is getting smaller with ε in each case:f = x -> (minimum(x), maximum(x))\ng = ε -> f([ai.err for ai in approximate(b, ε).approx_list])\ng(1.), g(0.1), g(0.01)Meanwhile, the number of constraints of the polygonal overapproximation increases, in this example by a power of 2 when the error is divided by a factorh = ε ->  length(approximate(b, ε).approx_list)\nh(1.), h(0.1), h(0.01)note: Note\nActually, the plotting function for an arbitrary LazySet plot(...), called recipe in the context of Plots.jl, is such that it receives a numeric argument ε and the routine itself calls overapproximate. However, some sets such as abstract polygons have their own plotting recipe hence do not require the error threshold, since they are plotted exactly as the convex hull of their vertices."
},

{
    "location": "man/interval_hulls.html#",
    "page": "Interval Hulls",
    "title": "Interval Hulls",
    "category": "page",
    "text": ""
},

{
    "location": "man/interval_hulls.html#Interval-Hulls-1",
    "page": "Interval Hulls",
    "title": "Interval Hulls",
    "category": "section",
    "text": "In this section we illustrate the interval hull operators as well as several plotting functionalities.Pages = [\"interval_hulls.md\"]\nDepth = 3DocTestSetup = quote\n    using LazySets, Plots, LazySets.Approximations\nend"
},

{
    "location": "man/interval_hulls.html#Balls-and-Singletons-1",
    "page": "Interval Hulls",
    "title": "Balls and Singletons",
    "category": "section",
    "text": "Consider a ball in the 2-norm. By default, the coefficients of this set are 64-bit floating point numbers. Other numeric types (such as lower precision floating point, or rational) can be defined with the proper argument types in the Ball2 constructor.using LazySets, Plots\n\nX = Ball2(ones(2), 0.5)To plot a lazy set, we use the plot function. By design, lazy sets plots overapproximate with box directions only. To have a sharp definition of the borders, use the accuracy as a second argument.plot(X, 1e-3, aspectratio=1)To add plots to the same pair of axes we use plot!. Let\'s add some points of the set which are farthest in some given directions. Single points can be plotted using the Singleton type. In the third line of code we plot the center of the ball picking a custom cross marker.plot!(Singleton(σ([1., 0], X)))\nplot!(Singleton(σ([1., 1], X)))\nplot!(Singleton(X.center), markershape=:x)note: Note\nTo see the list of available plot keyword arguments, use the plotattr([attr]) function, where attr is the symbol :Plot, :Series, :Axis or :Subplot.For the remainder of this section we define another ball in the 2-norm and its convex hull with X.Y = Ball2([-3,-.5], 0.8)\nZ = CH(X, Y)\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)"
},

{
    "location": "man/interval_hulls.html#Ballinf-approximation-1",
    "page": "Interval Hulls",
    "title": "Ballinf approximation",
    "category": "section",
    "text": "A simple overapproximation with a BallInf is obtained with the ballinf_approximation function, from the Approximations module. It overapproximates a convex set by a tight ball in the infinity norm by evaluating the support vector in the canonical directions.import LazySets.Approximations.ballinf_approximation\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nBapprox = ballinf_approximation(Z)\n\nplot!(Bapprox, alpha=0.1)\nplot!(Singleton(Bapprox.center), markershape=:x)Bapprox.center, Bapprox.radius"
},

{
    "location": "man/interval_hulls.html#Interval-hull-approximation-1",
    "page": "Interval Hulls",
    "title": "Interval hull approximation",
    "category": "section",
    "text": "If we want to have different lengths for each dimension, instead of the ballinf_approximation, we can use the approximation with a hyperrectangle through the interval_hull function.import LazySets.Approximations.interval_hull\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nHapprox = interval_hull(Z)\n\nplot!(Happrox, alpha=0.1)\nplot!(Singleton(Happrox.center), markershape=:x)Happrox.center, Happrox.radiusnote: Note\nThe interval_hull function is an alias for the box_approximation function. The nomenclature for approximation functions is *_approximation_*. To see a list of all approximation functions, either search in the docs or type names(LazySets.Approximations)."
},

{
    "location": "man/interval_hulls.html#Symmetric-interval-hull-1",
    "page": "Interval Hulls",
    "title": "Symmetric interval hull",
    "category": "section",
    "text": "Contrary to the previous approximations, the symmetric interval hull is centered around the origin. It is defined in the Approximations module as well.import LazySets.Approximations.symmetric_interval_hull\n\nplot(X, 1e-3, aspectratio=1)\nplot!(Y, 1e-3)\nplot!(Z, 1e-3, alpha=0.2)\n\nS = symmetric_interval_hull(Z)\nplot!(S, alpha=0.2)\nplot!(Singleton(S.center), markershape=:x)S.center, S.radiusWe can get the list of vertices using the vertices_list function:vertices_list(S)For instance, compute the support vector in the south-east direction:σ([1., -1.], S)It is also possible to pass a sparse vector as direction, and the result is a sparse vector:σ(sparsevec([1., -1.]), S)"
},

{
    "location": "man/interval_hulls.html#Norm,-radius-and-diameter-1",
    "page": "Interval Hulls",
    "title": "Norm, radius and diameter",
    "category": "section",
    "text": "In this part we illustrate some functions to obtain metric properties of sets, applied to the sets X, Y and Z defined previously, in the infinity norm. These functions apply generally to any LazySet. For some types, specialized methods are triggered automatically through multiple-dispatch.The norm of a convex set is the norm of the enclosing ball (of the given norm) of minimal volume. For instance:import LazySets.Approximations: norm, radius, diameter\n\nnorm(X), norm(Y), norm(Z)The radius of a convex set. It is the radius of the enclosing ball (of the given norm) of minimal volume with the same center. In the previous example,radius(X), radius(Y), radius(Z)Finally, it is sometimes convenient to ask directly the diameter of the set, defined as twice the radius:diameter(X), diameter(Y), diameter(Z)"
},

{
    "location": "man/convex_hulls.html#",
    "page": "Convex Hulls",
    "title": "Convex Hulls",
    "category": "page",
    "text": ""
},

{
    "location": "man/convex_hulls.html#Convex-Hulls-1",
    "page": "Convex Hulls",
    "title": "Convex Hulls",
    "category": "section",
    "text": "In this section we illustrate the convex hull operation. We give examples of the symbolic implementation, and the concrete convex hull in low dimensions.Pages = [\"convex_hulls.md\"]\nDepth = 3DocTestSetup = quote\n    using LazySets, Plots, LazySets.Approximations\nend"
},

{
    "location": "man/convex_hulls.html#Symbolic-convex-hull-1",
    "page": "Convex Hulls",
    "title": "Symbolic convex hull",
    "category": "section",
    "text": "The lazy convex hull, ConvexHull, is the binary operator that implements the convex hull of the union between two convex sets.using LazySets, Plots\n\nA = 1/sqrt(2.) * [1 -1; 1 1]\nBn = n -> BallInf(ones(n), 0.2)\n\nX = Bn(2)\nY = CH(X, expm(A) * X)The name CH is an alias for ConvexHull, so you can use both interchangeably. This type is parametric in the operands\'s types.p = plot(X, 1e-2, color=\"blue\")\nplot!(p, expm(A) * X, 1e-2, color=\"green\")\nplot!(p, Y, 1e-2, color=\"red\", alpha=0.2)We can as well work with a 100-dimensional set:X = Bn(100)\nA = blkdiag([sparse(A) for i in 1:50]...)\nY = CH(X, expm(full(A)) * X)\n\ndim(Y)To take the convex hull of a large number of sets, there is the n-ary type ConvexHullArray. For instance, below we create a collection of balls b via list comprehension, and pass them to create a new ConvexHullArray instance.b = [Ball2([2*pi*i/100, sin(2*pi*i/100)], 0.05) for i in 1:100];\nc = ConvexHullArray(b);\n\nplot(c, 1e-3, alpha=0.1, color=\"blue\")\nplot!(b, 1e-3, alpha=0.5, color=\"red\")"
},

{
    "location": "man/convex_hulls.html#D-convex-hull-1",
    "page": "Convex Hulls",
    "title": "2D convex hull",
    "category": "section",
    "text": "In two dimensions the convex_hull function computes the concrete convex hull of a set of points.points = N -> [randn(2) for i in 1:N]\nv = points(30)\nhull = convex_hull(v)\ntypeof(hull), length(v), length(hull)Notice that the output is a vector of floating point numbers representing the coordinates of the points, and that the number of points in the convex hull has decreased.We can plot both the random points and the polygon generated by the convex hull with the plot function:p = plot([Singleton(vi) for vi in v])\nplot!(p, VPolygon(hull), alpha=0.2)"
},

{
    "location": "man/convex_hulls.html#Using-static-vectors-1",
    "page": "Convex Hulls",
    "title": "Using static vectors",
    "category": "section",
    "text": "Usual vectors are such that you can push! and pop! without changing its type: the size is not a static property. Vectors of fixed size, among other types, are provided by the StaticArrays.jl package from the JuliaArrays ecosystem. Using static arrays for vectors of \"small\" dimension can dramatically improve performance.Since the convex hull algorithm supports any AbstractVector, it can be applied with static vectors. The following example illustrates this fact.v = points(1000)\nconvex_hull(points(3)) # warm-up\n\n@time convex_hull(v)Now working with static vectors:using StaticArrays\n\nconvex_hull([@SVector(rand(2)) for i in 1:3]) # warm-up\n\nv_static = [SVector{2, Float64}(vi) for vi in v]\n@time convex_hull(v_static)"
},

{
    "location": "man/set_operations.html#",
    "page": "Operations on Sets",
    "title": "Operations on Sets",
    "category": "page",
    "text": ""
},

{
    "location": "man/set_operations.html#Operations-on-sets-1",
    "page": "Operations on Sets",
    "title": "Operations on sets",
    "category": "section",
    "text": "In this section we show which typical set operations this library supports.Pages = [\"set_operations.md\"]\nDepth = 3We use the following four sets for illustration.using LazySets, LazySets.Approximations, Plots\nB1 = Ball1(-ones(2), 1.)\nB2 = Ball2(ones(2), 1.)\nBI = BallInf(zeros(2), 1.)\nH = Hyperrectangle(ones(2), ones(2))\nsets = [B1, B2, BI, H]\n\nfunction plot_sets(sets)\n    for S in sets\n        println(S)\n        plot!(S, 1e-2, fillalpha=0.1)\n    end\nend\n\nfunction plot_points(points, prefix)\n    for i in eachindex(points)\n        p = points[i]\n        num_occur = length(find(x -> x == p, points[1:i]))\n        x = p[1]\n        y = p[2]\n        if num_occur == 1\n            x += 0.15\n        elseif num_occur == 2\n            y += 0.15\n        elseif num_occur == 3\n            x -= 0.15\n        else\n            y -= 0.15\n        end\n        plot!(Singleton(p))\n        plot!(annotations=(x, y, text(\"$(prefix)$(i)\")))\n    end\nend\n\nplot1 = plot()\nplot_sets(sets)\nplot1"
},

{
    "location": "man/set_operations.html#Unary-operations-1",
    "page": "Operations on Sets",
    "title": "Unary operations",
    "category": "section",
    "text": "The following table lists all operations (apart from dim and σ, which must be supported by all types) that take one convex set as argument in the columns. In the rows we list all set types, both the interfaces (where we abbreviate the Abstract prefix), the basic set types, and the lazy set operations, each sorted alphabetically. The table entries have the following meaning.An \"x\" indicates that the operation is implemented for the respective set.\n\"(⋅)\" indicates that the operation is inherited from a supertype.type ↓ \\ operation → radius diameter norm an_element ∈\nInterfaces     \nLazySet     \nAHPolygon    x x\nAHyperrectangle x x x (x) x\nAPointSymmetric    x \nAPointSymmetricPolytope    x \nAPolygon     \nAPolytope     \nASingleton (x) (x) (x) x x\n     \nBasic set types     \nBall1    (x) x\nBall2    (x) x\nBallInf x (x) (x) (x) (x)\nBallp    (x) x\nEllipsoid    (x) x\nEmptySet    x x\nHPolygon/HPolygonOpt    (x) (x)\nHPolytope     x\nHyperrectangle (x) (x) (x) (x) (x)\nSingleton (x) (x) (x) (x) (x)\nVPolygon    x x\nZeroSet (x) (x) (x) (x) x\nZonotope    (x) x\n     \nLazy set operation types     \nCartesianProduct     x\nCartesianProductArray     x\nConvexHull     \nConvexHullArray     \nExponentialMap     x\nExponentialProjectionMap     \nHalfSpace    x x\nHyperplane    x x\nIntersection     x\nLinearMap     x\nMinkowskiSum     \nMinkowskiSumArray     \nSymmetricIntervalHull (x) (x) (x) (x) (x)"
},

{
    "location": "man/set_operations.html#radius-1",
    "page": "Operations on Sets",
    "title": "radius",
    "category": "section",
    "text": "This function returns the radius of a set. It is defined as the radius of the enclosing ball (of the given norm) of minimal volume with the same center.radius(B1), radius(B2), radius(BI), radius(H)"
},

{
    "location": "man/set_operations.html#diameter-1",
    "page": "Operations on Sets",
    "title": "diameter",
    "category": "section",
    "text": "This function returns the diameter of a set. It is defined as the diameter of the enclosing ball (of the given norm) of minimal volume with the same center. The implementation is inherited for all set types if the norm is the infinity norm, in which case the result is defined as twice the radius.diameter(B1), diameter(B2), diameter(BI), diameter(H)"
},

{
    "location": "man/set_operations.html#norm-1",
    "page": "Operations on Sets",
    "title": "norm",
    "category": "section",
    "text": "This function returns the norm of a set. It is defined as the norm of the enclosing ball (of the given norm) of minimal volume centered in the origin.# print 1-norm, 2-norm, and infinity norm (if available)\nprintln((\"-\", \"-\", norm(B1, Inf)))\nprintln((\"-\", \"-\", norm(B2, Inf)))\nprintln((norm(BI, 1), norm(BI, 2), norm(BI, Inf)))\nprintln((norm(H, 1), norm(H, 2), norm(H, Inf)))"
},

{
    "location": "man/set_operations.html#an_element-1",
    "page": "Operations on Sets",
    "title": "an_element",
    "category": "section",
    "text": "This function returns some element in the set. Consecutive calls to this function typically return the same element.an_element(B1), an_element(B2), an_element(BI), an_element(H)"
},

{
    "location": "man/set_operations.html#-1",
    "page": "Operations on Sets",
    "title": "∈",
    "category": "section",
    "text": "This function checks containment of a given vector in the set. The operator can be used in infix notation (v ∈ S) and in inverse operand order (S ∋ v). Alias: inp1 = [1.5, 1.5]\np2 = [0.1, 0.1]\np3 = [-0.9, -0.8]\npoints = [p1, p2, p3]\n\nfor p in [p1, p2, p3]\n    println(\"$p ∈ (B1, B2, BI, H)? ($(p ∈ B1), $(p ∈ B2), $(p ∈ BI), $(p ∈ H))\")\nendplot1 = plot()\nplot_sets(sets)\nplot_points(points, \"p\")\nplot1"
},

{
    "location": "man/set_operations.html#Binary-operations-1",
    "page": "Operations on Sets",
    "title": "Binary operations",
    "category": "section",
    "text": "The following table lists all operations that take two convex set as argument in the entries. In the rows we list all set types, both the interfaces (where we abbreviate the Abstract prefix), the basic set types, and the lazy set operations, each sorted alphabetically. In the columns we also list the operations, but abbreviated. The table entries consist of subsets of the following list of operations.\"⊆\" stands for the subset check operation.\n\"∩=∅\" stands for the intersection emptiness check operation.\n\"(⋅)\" indicates that the operation is inherited from a supertype.\n\"[⋅]\" indicates that a possible type ambiguity can occur but is resolved.\n\"{⋅}\" indicates that a more efficient implementation is used instead of the inherited one.type ↓ \\ type → LazyS AHPon AHrec APSym APSPol APgon APtop ASingle B1 B2 BInf Bp Ellip EmpSt HPgon HPtop Hrect Single VPgon ZeroSet Zonot CP CPA CH CHA EMap EPM HalfS HypPl Inter LMap MSum MSA SIH\nInterfaces                                  \nLazySet   ⊆     (⊆),∩=∅   (⊆)      (⊆) (⊆)  (⊆)              (⊆)\nAHPolygon (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nAHyperrectangle (⊆) (⊆) {⊆},∩=∅ (⊆) (⊆) (⊆) (⊆) [⊆,∩=∅] (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nAPointSymmetric   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nAPointSymmetricPolytope (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nAPolygon (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nAPolytope ⊆ (⊆) [⊆] (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nASingleton {⊆},∩=∅ (⊆,∩=∅) [⊆,∩=∅] (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) [⊆,∩=∅] (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) ((⊆,∩=∅)) (⊆,∩=∅) ((⊆,∩=∅)) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅)\n                                  \nBasic set types                                  \nBall1 (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nBall2   (⊆)     {⊆},(∩=∅)  ⊆,∩=∅        (⊆,∩=∅)  (⊆,∩=∅)              \nBallInf (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nBallp   (⊆)     {⊆},(∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nEllipsoid   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nEmptySet   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nHPolygon/HPolygonOpt (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nHPolytope (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nHyperrectangle (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nSingleton (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅)\nVPolygon (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\nZeroSet (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅) (⊆,∩=∅)\nZonotope (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)\n                                  \nLazy set operation types                                  \nCartesianProduct   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nCartesianProductArray   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nConvexHull   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nConvexHullArray   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nExponentialMap   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nExponentialProjectionMap   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nHalfSpace   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nHyperplane   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nIntersection   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nLinearMap   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nMinkowskiSum   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nMinkowskiSumArray   (⊆)     (⊆,∩=∅)          (⊆,∩=∅)  (⊆,∩=∅)              \nSymmetricIntervalHull (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆,∩=∅) (⊆) (⊆,∩=∅) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆) (⊆)"
},

{
    "location": "man/set_operations.html#-2",
    "page": "Operations on Sets",
    "title": "⊆",
    "category": "section",
    "text": "This function checks whether a set is a subset of another set. It can optionally produce a witness if the subset relation does not hold. The operator can be used in infix notation (X ⊆ S). Alias: issubsetprintln(B1 ⊆ B2)\nw1 = ⊆(B1, B2, true)[2]\nprintln(B1 ⊆ BI)\nw2 = ⊆(B1, BI, true)[2]\nprintln(B1 ⊆ H)\nw3 = ⊆(B1, H, true)[2]\n# \'B2 ⊆ B1\' is not supported yet\n# w11 = ⊆(B2, B1, true)[2]\nprintln(B2 ⊆ BI)\nw4 = ⊆(B2, BI, true)[2]\nprintln(B2 ⊆ H)\nprintln(BI ⊆ B1)\nw5 = ⊆(BI, B1, true)[2]\nprintln(BI ⊆ B2)\nw6 = ⊆(BI, B2, true)[2]\nprintln(BI ⊆ H)\nw7 = ⊆(BI, H, true)[2]\nprintln(H ⊆ B1)\nw8 = ⊆(H, B1, true)[2]\nprintln(H ⊆ B2)\nw9 = ⊆(H, B2, true)[2]\nprintln(H ⊆ BI)\nw10 = ⊆(H, BI, true)[2];witnesses = [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10]\n\nplot1 = plot()\nplot_sets(sets)\nplot_points(witnesses, \"w\")\nplot1"
},

{
    "location": "man/set_operations.html#is_intersection_empty-1",
    "page": "Operations on Sets",
    "title": "is_intersection_empty",
    "category": "section",
    "text": "This function checks whether the intersection of two sets is empty. It can optionally produce a witness if the intersection is nonempty.println(is_intersection_empty(BI, H))\nw1 = is_intersection_empty(BI, H, true)[2]\n# none of the other combinations are supported yet\n# is_intersection_empty(B1, B2)\n# is_intersection_empty(B1, BI)\n# is_intersection_empty(B1, H)\n# w2 = is_intersection_empty(B1, H, true)[2]\n# is_intersection_empty(B2, BI)\n# is_intersection_empty(B2, H)witnesses = [w1]\n\nplot1 = plot()\nplot_sets(sets)\nplot_points(witnesses, \"w\")\nplot1"
},

{
    "location": "man/reach_zonotopes.html#",
    "page": "A Reachability Algorithm",
    "title": "A Reachability Algorithm",
    "category": "page",
    "text": ""
},

{
    "location": "man/reach_zonotopes.html#A-Reachability-Algorithm-Using-Zonotopes-1",
    "page": "A Reachability Algorithm",
    "title": "A Reachability Algorithm Using Zonotopes",
    "category": "section",
    "text": "Pages = [\"reach_zonotopes.md\"]\nDepth = 3"
},

{
    "location": "man/reach_zonotopes.html#Introduction-1",
    "page": "A Reachability Algorithm",
    "title": "Introduction",
    "category": "section",
    "text": "In this section we present an algorithm implemented using LazySets that computes the reach sets of an affine ordinary differential equation (ODE). This algorithm is from A. Girard\'s \"Reachability of uncertain linear systems using zonotopes, HSCC. Vol. 5. 2005. We have chosen this algorithm for the purpose of illustration of a complete application of LazySets.Let us introduce some notation. Consider the continuous initial set-valued problem (IVP)    x(t) = A x(t) + u(t)in the time interval t  0 T, where:A is a real matrix of order n,\nu(t) is a non-deterministic input such that Vert u(t) Vert_   for all t,\nx(0)  mathcalX_0, where mathcalX_0 is a convex set.Given a step size , Algorithm1 returns a sequence of sets that overapproximates the states reachable by any trajectory of this IVP."
},

{
    "location": "man/reach_zonotopes.html#Algorithm-1",
    "page": "A Reachability Algorithm",
    "title": "Algorithm",
    "category": "section",
    "text": "using LazySets, Plots\n\nfunction Algorithm1(A, X0, δ, μ, T)\n\n    # bloating factors\n    Anorm = norm(A, Inf)\n    α = (expm(δ*Anorm) - 1 - δ*Anorm)/norm(X0, Inf)\n    β = (expm(δ*Anorm) - 1)*μ/Anorm\n\n    # discretized system\n    n = size(A, 1)\n    ϕ = expm(δ*A)\n    N = floor(Int, T/δ)\n\n    # preallocate arrays\n    Q = Vector{LazySet}(N)\n    R = Vector{LazySet}(N)\n\n    # initial reach set in the time interval [0, δ]\n    ϕp = (I+ϕ)/2\n    ϕm = (I-ϕ)/2\n    c = X0.center\n    Q1_generators = hcat(ϕp * X0.generators, ϕm * c, ϕm * X0.generators)\n    Q[1] = Zonotope(ϕp * c, Q1_generators) ⊕ BallInf(zeros(n), α + β)\n    R[1] = Q[1]\n\n    # set recurrence for [δ, 2δ], ..., [(N-1)δ, Nδ]\n    ballβ = BallInf(zeros(n), β)\n    for i in 2:N\n        Q[i] = ϕ * Q[i-1] ⊕ ballβ\n        R[i] = Q[i]\n    end\n    return R\nend"
},

{
    "location": "man/reach_zonotopes.html#Projection-1",
    "page": "A Reachability Algorithm",
    "title": "Projection",
    "category": "section",
    "text": "function project(R, vars, n)\n    # projection matrix\n    M = sparse(1:2, vars, [1., 1.], 2, n)\n    return [M * Ri for Ri in R]\nend"
},

{
    "location": "man/reach_zonotopes.html#Example-1-1",
    "page": "A Reachability Algorithm",
    "title": "Example 1",
    "category": "section",
    "text": "A = [-1 -4; 4 -1]\nX0 = Zonotope([1.0, 0.0], 0.1*eye(2))\nμ = 0.05\nδ = 0.02\nT = 2.\n\nR = Algorithm1(A, X0, δ, μ, 2.*δ); # warm-up\n\nR = Algorithm1(A, X0, δ, μ, T)\n\nplot(R, 1e-2, fillalpha=0.1)"
},

{
    "location": "man/reach_zonotopes.html#Example-2-1",
    "page": "A Reachability Algorithm",
    "title": "Example 2",
    "category": "section",
    "text": "A = Matrix{Float64}([-1 -4 0 0 0;\n                      4 -1 0 0 0;\n                      0 0 -3 1 0;\n                      0 0 -1 -3 0;\n                      0 0 0 0 -2])\nX0 = Zonotope([1.0, 0.0, 0.0, 0.0, 0.0], 0.1*eye(5))\nμ = 0.01\nδ = 0.005\nT = 1.\n\nR = Algorithm1(A, X0, δ, μ, 2*δ); # warm-up\n\nR = Algorithm1(A, X0, δ, μ, T)\nRproj = project(R, [1, 3], 5)\n\nplot(Rproj, 1e-2, fillalpha=0.1, xlabel=\"x1\", ylabel=\"x3\")"
},

{
    "location": "man/reach_zonotopes_hybrid.html#",
    "page": "A Hybrid Reachability Algorithm",
    "title": "A Hybrid Reachability Algorithm",
    "category": "page",
    "text": ""
},

{
    "location": "man/reach_zonotopes_hybrid.html#A-Hybrid-Reachability-Algorithm-Using-Zonotopes-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "A Hybrid Reachability Algorithm Using Zonotopes",
    "category": "section",
    "text": "Pages = [\"reach_zonotopes_hybrid.md\"]\nDepth = 3"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Introduction-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Introduction",
    "category": "section",
    "text": "In this section we present an algorithm implemented using LazySets that computes the reach sets of a hybrid system of linear ordinary differential equations (ODE). This algorithm is an extension of the one presented in A Reachability Algorithm Using Zonotopes.We consider a simple case here where modes do not have invariants and transitions do not have updates. It makes sense to consider must transitions in this case, i.e., that a transition is taken as soon as it is enabled, but we also offer the may transitions interpretation below."
},

{
    "location": "man/reach_zonotopes_hybrid.html#Hybrid-algorithm-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Hybrid algorithm",
    "category": "section",
    "text": "The hybrid algorithm maintains a queue of triples (m X t) where m is a mode, X is a set of states, and t is a time point. For each element in the queue the algorithm calls the Continuous algorithm to compute the reachable states in the current mode m, starting in the current states X at time t. The result is a flowpipe, i.e., a sequence of sets of states. For each of those sets we check intersection with the guards of m\'s outgoing transitions. Depending on the transition semantics, we add the discrete successors to the queue and continue with the next iteration until the queue is empty.using LazySets, Plots\n\nfunction reach_hybrid(As, Ts, init, δ, μ, T, max_order, must_semantics)\n    # initialize queue with initial mode and states at time t=0\n    queue = [(init[1], init[2], 0.)]\n\n    res = Tuple{LazySet, Int}[]\n    while !isempty(queue)\n        init, loc, t = pop!(queue)\n        println(\"currently in location $loc at time $t\")\n        R = reach_continuous(As[loc], init, δ, μ, T-t, max_order)\n        found_transition = false\n        for i in 1:length(R)-1\n            S = R[i]\n            push!(res, (S, loc))\n            for (guard, tgt_loc) in Ts[loc]\n                if !is_intersection_empty(S, guard)\n                    new_t = t + δ * i\n                    push!(queue, (S, tgt_loc, new_t))\n                    found_transition = true\n                    println(\"transition $loc -> $tgt_loc at time $new_t\")\n                end\n            end\n            if must_semantics && found_transition\n                break\n            end\n        end\n        if !must_semantics || !found_transition && length(R) > 0\n            push!(res, (R[end], loc))\n        end\n    end\n    return res\nend"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Continuous-algorithm-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Continuous algorithm",
    "category": "section",
    "text": "This is basically the same implementation as outlined in the section A Reachability Algorithm Using Zonotopes, only that this time we use concrete operations on zonotopes.function reach_continuous(A, X0, δ, μ, T, max_order)\n    # bloating factors\n    Anorm = norm(A, Inf)\n    α = (expm(δ*Anorm) - 1 - δ*Anorm)/norm(X0, Inf)\n    β = (expm(δ*Anorm) - 1)*μ/Anorm\n\n    # discretized system\n    n = size(A, 1)\n    ϕ = expm(δ*A)\n    N = floor(Int, T/δ)\n\n    # preallocate array\n    R = Vector{LazySet}(N)\n    if N == 0\n        return R\n    end\n\n    # initial reach set in the time interval [0, δ]\n    ϕp = (I+ϕ)/2\n    ϕm = (I-ϕ)/2\n    c = X0.center\n    Q1_generators = hcat(ϕp * X0.generators, ϕm * c, ϕm * X0.generators)\n    P1 = Phi1(A, δ)\n    R[1] = minkowski_sum(Zonotope(ϕp * c, Q1_generators),\n                         Zonotope(zeros(n), (α + β)*eye(n)))\n    if order(R[1]) > max_order\n        R[1] = reduce_order(R[1], max_order)\n    end\n\n    # set recurrence for [δ, 2δ], ..., [(N-1)δ, Nδ]\n    ballβ = Zonotope(zeros(n), β*eye(n))\n    for i in 2:N\n        R[i] = minkowski_sum(linear_map(ϕ, R[i-1]), ballβ)\n        if order(R[i]) > max_order\n            R[i] = reduce_order(R[i], max_order)\n        end\n    end\n    return R\nendThe function Phi1 represents the approximation model. We use the following implementation here.function Phi1(A, δ)\n    n = size(A, 1)\n    P = expm(full([A * δ sparse(δ*I, n, n) spzeros(n, n);\n                   spzeros(n, 2*n) sparse(δ*I, n, n);\n                   spzeros(n, 3*n)]))\n    return P[1:n, (n+1):2*n]\nend"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Plotting-results-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Plotting results",
    "category": "section",
    "text": "For illustration purposes it is helpful to plot the flowpipes in different colors, depending on the current mode. The following function does that for 2-mode models.function plot_res(res)\n    p = plot()\n    for i in 1:length(res)\n        if res[i][2] == 1\n            c = \"blue\"\n        elseif res[i][2] == 2\n            c = \"red\"\n        end\n        plot!(p, reduce_order(res[i][1], 2), color=c, alpha=0.1)\n    end\n    return p\nend"
},

{
    "location": "man/reach_zonotopes_hybrid.html#Example-1",
    "page": "A Hybrid Reachability Algorithm",
    "title": "Example",
    "category": "section",
    "text": "We consider an extension of the example presented in Reachability of uncertain linear systems using zonotopes, A. Girard, HSCC. Vol. 5. 2005 to a hybrid system with two modes ell_i, i = 1 2, with initial states 09 11 times -01 01 and uncertain inputs from a set u with mu = Vert u Vert_infty = 0001.The dynamics matrices A_i are defined as follows:	A_1 = beginpmatrix -1  -4  4  -1 endpmatrix qquad A_2 = beginpmatrix 1  4  -4  -1 endpmatrixWe add a transition t_i from mode ell_i to ell_3-i with a hyperplane guard g_i:	g_1 triangleq x_1 = -05 qquad g_2 triangleq x_2 = -03LazySets offers an order reduction function for zonotopes, which we used here with an upper bound of 10 generators. We plot the reachable states for the time interval 0 4 and time step  = 0001.    # dynamics\n    A1 = [-1 -4; 4 -1]\n    A2 = [1 4; -4 -1]\n    As = [A1, A2]\n\n    # transitions\n    t1 = [(Hyperplane([1., 0.], -0.5), 2)]\n    t2 = [(Hyperplane([0., 1.], -0.3), 1)]\n    Ts = [t1, t2]\n\n    # initial condition\n    X0 = Zonotope([1.0, 0.0], 0.1*eye(2))\n    init_loc = 1\n    init = (X0, init_loc)\n\n    # input uncertainty\n    μ = 0.001\n\n    # discretization step\n    δ = 0.001\n\n    # time bound\n    T = 4.\n\n    # maximum order of zonotopes\n    max_order = 10\n\n    # use must semantics?\n    must_semantics = true\n\n    # run analysis\n    res = reach_hybrid(As, Ts, init, δ, μ, T, max_order, must_semantics)\n\n    # plot result\n    plot_res(res)"
},

{
    "location": "man/concrete_polyhedra.html#",
    "page": "Concrete Polyhedra",
    "title": "Concrete Polyhedra",
    "category": "page",
    "text": ""
},

{
    "location": "man/concrete_polyhedra.html#Concrete-Polyhedra-1",
    "page": "Concrete Polyhedra",
    "title": "Concrete Polyhedra",
    "category": "section",
    "text": "The focus of LazySets.jl is to wrap set representations and operations into specialized types, delaying the evaluation of the result of an expression until it is necessary. However, sometimes it is necessary to do an explicit computation. For concrete operations with polyhedra we rely on the polyhedra manipulation library Polyhedra.jl.Actually, Polyhedra.jl provides a unified interface to well-known implementations of polyhedral computations, such as CDD or LRS (see the complete list in the documentation of Polyhedra.jl). This is a great advantage because we can easily use a library that supports floating point arithmetic, rational arithmetic, multiple precision, etc. The libraries also include projection and elimination of variables through Fourier-Motzkin.Below we give examples of operations that are actually done via Polyhedra.jl.Pages = [\"concrete_polyhedra.md\"]\nDepth = 3DocTestSetup = quote\n    using LazySets, Plots, LazySets.Approximations, Polyhedra\nend"
},

{
    "location": "man/concrete_polyhedra.html#Creating-polyhedra-1",
    "page": "Concrete Polyhedra",
    "title": "Creating polyhedra",
    "category": "section",
    "text": "To use the Polyhedra.jl interface, you need to load the package with using Polyhedra. Let\'s create an H-representation object:using LazySets, Plots, Polyhedra\n\nA = [1. 1;1 -1;-1 0]\nb = [1.,0,0]\nhrep = SimpleHRepresentation(A, b)It is used to instantiate a new polyhedron:p = polyhedron(hrep)Now, p is of the generic type Polyhedra.SimplePolyhedron{2,Float64}, where 2 states for its ambient dimension, and Float64 the numeric field:typeof(p)Observe that we instantiate a particular backend, such as the CDD library:using CDDLib\n\np = polyhedron(hrep, CDDLib.CDDLibrary())On the other hand, a LazySets.HPolytope object can be constructed from p:x = HPolytope(p)\nx.constraintsConversely, from a HPolytope we can build a polyhedron:y = polyhedron(x)\ntypeof(y)Moreover, you can specify the backend with an extra argument. For instance, we can use an exact representation through the CDDLibrary(:exact):A, b = Rational{Int}[1 1;1 -1;-1 0], Rational{Int}[1,0,0]\np = HPolytope(A, b)\n\npolyhedron(p, CDDLib.CDDLibrary(:exact))"
},

{
    "location": "man/concrete_polyhedra.html#Methods-1",
    "page": "Concrete Polyhedra",
    "title": "Methods",
    "category": "section",
    "text": "The utility methods available are convex hull, intersection and cartesian product. The dual representation as a list of vertices can be obtained with the vertices_list function.For example, the intersection of two polytopes is performed with the intersect method.E = Ellipsoid(ones(2), diagm([2.0, 0.5]))\nB = Ball1([2.5, 1.5], .8)\n\nimport LazySets.Approximations.overapproximate\npolyoverapprox(x) = HPolytope(overapproximate(x, 1e-3).constraints)\n\nEpoly = polyoverapprox(E)\nBpoly = polyoverapprox(B)\nX = intersect(Epoly, Bpoly)\n\nplot(E, 1e-3, aspectratio=1, alpha=0.4)\nplot!(B, 1e-3, alpha=0.4)\nplot!(X, 1e-3, alpha=0.4, color=\"black\")"
},

{
    "location": "man/concrete_polyhedra.html#Projections-1",
    "page": "Concrete Polyhedra",
    "title": "Projections",
    "category": "section",
    "text": "Projection of high-dimensional polyhedra and elimination of variables can be performed with the eliminate function, which supports three types of methods: :FourierMotzkin, :BlockElimination and :ProjectGenerators. See the documentation of Polyhedra.jl for further details."
},

{
    "location": "lib/interfaces.html#",
    "page": "Set Interfaces",
    "title": "Set Interfaces",
    "category": "page",
    "text": ""
},

{
    "location": "lib/interfaces.html#Set-Interfaces-1",
    "page": "Set Interfaces",
    "title": "Set Interfaces",
    "category": "section",
    "text": "This section of the manual describes the interfaces for different set types. Every set that fits the description of an interface should also implement it. This helps in several ways:avoid code duplicates,\nprovide functions for many sets at once,\nallow changes in the source code without changing the API.The interface functions are outlined in the interface documentation. See Common Set Representations for implementations of the interfaces.note: Note\nThe naming convention is such that all interface names (with the exception of the main abstract type LazySet) should be preceded by Abstract.The following diagram shows the interface hierarchy.(Image: ../assets/interfaces.png)Pages = [\"interfaces.md\"]\nDepth = 4CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/interfaces.html#LazySets.LazySet",
    "page": "Set Interfaces",
    "title": "LazySets.LazySet",
    "category": "Type",
    "text": "LazySet{N}\n\nAbstract type for convex sets, i.e., sets characterized by a (possibly infinite) intersection of halfspaces, or equivalently, sets S such that for any two elements x y  S and 0    1 it holds that  x + (1-) y  S.\n\nNotes\n\nLazySet types should be parameterized with a type N, typically N<:Real, for using different numeric types.\n\nEvery concrete LazySet must define the following functions:\n\nσ(d::AbstractVector{N}, S::LazySet)::AbstractVector{N} – the   support vector of S in a given direction d\ndim(S::LazySet)::Int – the ambient dimension of S\n\njulia> subtypes(LazySet)\n17-element Array{Union{DataType, UnionAll},1}:\n LazySets.AbstractPointSymmetric\n LazySets.AbstractPolytope\n LazySets.CartesianProduct\n LazySets.CartesianProductArray\n LazySets.ConvexHull\n LazySets.ConvexHullArray\n LazySets.EmptySet\n LazySets.ExponentialMap\n LazySets.ExponentialProjectionMap\n LazySets.HalfSpace\n LazySets.Hyperplane\n LazySets.Intersection\n LazySets.Line\n LazySets.LineSegment\n LazySets.LinearMap\n LazySets.MinkowskiSum\n LazySets.MinkowskiSumArray\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySet-1",
    "page": "Set Interfaces",
    "title": "LazySet",
    "category": "section",
    "text": "Every convex set in this library implements this interface.LazySet"
},

{
    "location": "lib/interfaces.html#LazySets.support_vector",
    "page": "Set Interfaces",
    "title": "LazySets.support_vector",
    "category": "Function",
    "text": "support_vector\n\nAlias for the support vector σ.\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.ρ",
    "page": "Set Interfaces",
    "title": "LazySets.ρ",
    "category": "Function",
    "text": "ρ(d::AbstractVector{N}, S::LazySet{N})::N where {N<:Real}\n\nEvaluate the support function of a set in a given direction.\n\nInput\n\nd – direction\nS – convex set\n\nOutput\n\nThe support function of the set S for the direction d.\n\n\n\n"
},

{
    "location": "lib/interfaces.html#LazySets.support_function",
    "page": "Set Interfaces",
    "title": "LazySets.support_function",
    "category": "Function",
    "text": "support_function\n\nAlias for the support function ρ.\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Support-function-and-support-vector-1",
    "page": "Set Interfaces",
    "title": "Support function and support vector",
    "category": "section",
    "text": "Every LazySet type must define a function σ to compute the support vector.support_vector\nρ\nsupport_function"
},

{
    "location": "lib/interfaces.html#LazySets.an_element-Tuple{LazySets.LazySet{Float64}}",
    "page": "Set Interfaces",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Other-globally-defined-set-functions-1",
    "page": "Set Interfaces",
    "title": "Other globally defined set functions",
    "category": "section",
    "text": "an_element(S::LazySet{Float64})"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPointSymmetric",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPointSymmetric",
    "category": "Type",
    "text": "AbstractPointSymmetric{N<:Real} <: LazySet{N}\n\nAbstract type for point symmetric sets.\n\nNotes\n\nEvery concrete AbstractPointSymmetric must define the following functions:\n\ncenter(::AbstractPointSymmetric{N})::Vector{N} – return the center point\n\njulia> subtypes(AbstractPointSymmetric)\n3-element Array{Union{DataType, UnionAll},1}:\n LazySets.Ball2\n LazySets.Ballp\n LazySets.Ellipsoid\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Point-symmetric-set-1",
    "page": "Set Interfaces",
    "title": "Point symmetric set",
    "category": "section",
    "text": "Point symmetric sets such as balls of different norms are characterized by a center. Note that there is a special interface combination Point symmetric polytope.AbstractPointSymmetric"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPolytope",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPolytope",
    "category": "Type",
    "text": "AbstractPolytope{N<:Real} <: LazySet{N}\n\nAbstract type for polytopic sets, i.e., sets with finitely many flat facets, or equivalently, sets defined as an intersection of a finite number of halfspaces, or equivalently, sets with finitely many vertices.\n\nNotes\n\nEvery concrete AbstractPolytope must define the following functions:\n\nvertices_list(::AbstractPolytope{N})::Vector{Vector{N}} – return a list of   all vertices\n\njulia> subtypes(AbstractPolytope)\n4-element Array{Union{DataType, UnionAll},1}:\n LazySets.AbstractPointSymmetricPolytope\n LazySets.AbstractPolygon\n LazySets.HPolytope\n LazySets.VPolytope\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Polytope-1",
    "page": "Set Interfaces",
    "title": "Polytope",
    "category": "section",
    "text": "A polytope has finitely many vertices (V-representation) resp. facets (H-representation). Note that there is a special interface combination Point symmetric polytope.AbstractPolytope"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPolygon",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPolygon",
    "category": "Type",
    "text": "AbstractPolygon{N<:Real} <: AbstractPolytope{N}\n\nAbstract type for polygons (i.e., 2D polytopes).\n\nNotes\n\nEvery concrete AbstractPolygon must define the following functions:\n\ntovrep(::AbstractPolygon{N})::VPolygon{N}         – transform into   V-representation\ntohrep(::AbstractPolygon{N})::AbstractHPolygon{N} – transform into   H-representation\n\njulia> subtypes(AbstractPolygon)\n2-element Array{Union{DataType, UnionAll},1}:\n LazySets.AbstractHPolygon\n LazySets.VPolygon\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Polygon-1",
    "page": "Set Interfaces",
    "title": "Polygon",
    "category": "section",
    "text": "A polygon is a two-dimensional polytope.AbstractPolygon"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractHPolygon",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractHPolygon",
    "category": "Type",
    "text": "AbstractHPolygon{N<:Real} <: AbstractPolygon{N}\n\nAbstract type for polygons in H-representation (i.e., constraints).\n\nNotes\n\nEvery concrete AbstractHPolygon must have the following fields:\n\nconstraints::Vector{LinearConstraint{N}} – the constraints\n\nNew subtypes should be added to the convert method in order to be convertible.\n\njulia> subtypes(AbstractHPolygon)\n2-element Array{Union{DataType, UnionAll},1}:\n LazySets.HPolygon\n LazySets.HPolygonOpt\n\n\n\n"
},

{
    "location": "lib/interfaces.html#HPolygon-1",
    "page": "Set Interfaces",
    "title": "HPolygon",
    "category": "section",
    "text": "An HPolygon is a polygon in H-representation (or constraint representation).AbstractHPolygon"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractPointSymmetricPolytope",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractPointSymmetricPolytope",
    "category": "Type",
    "text": "AbstractPointSymmetricPolytope{N<:Real} <: AbstractPolytope{N}\n\nAbstract type for point symmetric, polytopic sets. It combines the AbstractPointSymmetric and AbstractPolytope interfaces. Such a type combination is necessary as long as Julia does not support multiple inheritance.\n\nNotes\n\nEvery concrete AbstractPointSymmetricPolytope must define the following functions:\n\nfrom AbstractPointSymmetric:\ncenter(::AbstractPointSymmetricPolytope{N})::Vector{N} – return the  center point\nfrom AbstractPolytope:\nvertices_list(::AbstractPointSymmetricPolytope{N})::Vector{Vector{N}}  – return a list of all vertices\n\njulia> subtypes(AbstractPointSymmetricPolytope)\n3-element Array{Union{DataType, UnionAll},1}:\n LazySets.AbstractHyperrectangle\n LazySets.Ball1\n LazySets.Zonotope\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Point-symmetric-polytope-1",
    "page": "Set Interfaces",
    "title": "Point symmetric polytope",
    "category": "section",
    "text": "A point symmetric polytope is a combination of two other interfaces: Point symmetric set and Polytope.AbstractPointSymmetricPolytope"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractHyperrectangle",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractHyperrectangle",
    "category": "Type",
    "text": "AbstractHyperrectangle{N<:Real} <: AbstractPointSymmetricPolytope{N}\n\nAbstract type for hyperrectangular sets.\n\nNotes\n\nEvery concrete AbstractHyperrectangle must define the following functions:\n\nradius_hyperrectangle(::AbstractHyperrectangle{N})::Vector{N} – return the   hyperrectangle\'s radius, which is a full-dimensional vector\nradius_hyperrectangle(::AbstractHyperrectangle{N}, i::Int)::N – return the   hyperrectangle\'s radius in the i-th dimension\n\njulia> subtypes(AbstractHyperrectangle)\n4-element Array{Union{DataType, UnionAll},1}:\n LazySets.AbstractSingleton\n LazySets.BallInf\n LazySets.Hyperrectangle\n LazySets.SymmetricIntervalHull\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Hyperrectangle-1",
    "page": "Set Interfaces",
    "title": "Hyperrectangle",
    "category": "section",
    "text": "A hyperrectangle is a special point symmetric polytope with axis-aligned facets.AbstractHyperrectangle"
},

{
    "location": "lib/interfaces.html#LazySets.AbstractSingleton",
    "page": "Set Interfaces",
    "title": "LazySets.AbstractSingleton",
    "category": "Type",
    "text": "AbstractSingleton{N<:Real} <: AbstractHyperrectangle{N}\n\nAbstract type for sets with a single value.\n\nNotes\n\nEvery concrete AbstractSingleton must define the following functions:\n\nelement(::AbstractSingleton{N})::Vector{N} – return the single element\nelement(::AbstractSingleton{N}, i::Int)::N – return the single element\'s   entry in the i-th dimension\n\njulia> subtypes(AbstractSingleton)\n2-element Array{Union{DataType, UnionAll},1}:\n LazySets.Singleton\n LazySets.ZeroSet\n\n\n\n"
},

{
    "location": "lib/interfaces.html#Singleton-1",
    "page": "Set Interfaces",
    "title": "Singleton",
    "category": "section",
    "text": "A singleton is a special hyperrectangle consisting of only one point.AbstractSingleton"
},

{
    "location": "lib/representations.html#",
    "page": "Common Set Representations",
    "title": "Common Set Representations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/representations.html#Common-Set-Representations-1",
    "page": "Common Set Representations",
    "title": "Common Set Representations",
    "category": "section",
    "text": "This section of the manual describes the basic set representation types.Pages = [\"representations.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/representations.html#Balls-1",
    "page": "Common Set Representations",
    "title": "Balls",
    "category": "section",
    "text": ""
},

{
    "location": "lib/representations.html#LazySets.Ball2",
    "page": "Common Set Representations",
    "title": "LazySets.Ball2",
    "category": "Type",
    "text": "Ball2{N<:AbstractFloat} <: AbstractPointSymmetric{N}\n\nType that represents a ball in the 2-norm.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a real scalar ( 0)\n\nNotes\n\nMathematically, a ball in the 2-norm is defined as the set\n\nmathcalB_2^n(c r) =  x  mathbbR^n   x - c _2  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _2 denotes the Euclidean norm (also known as 2-norm), defined as  x _2 = left( sumlimits_i=1^n x_i^2 right)^12 for any x  mathbbR^n.\n\nExamples\n\nCreate a five-dimensional ball B in the 2-norm centered at the origin with radius 0.5:\n\njulia> B = Ball2(zeros(5), 0.5)\nLazySets.Ball2{Float64}([0.0, 0.0, 0.0, 0.0, 0.0], 0.5)\njulia> dim(B)\n5\n\nEvaluate B\'s support vector in the direction 12345:\n\njulia> σ([1.,2.,3.,4.,5.], B)\n5-element Array{Float64,1}:\n 0.06742\n 0.13484\n 0.20226\n 0.26968\n 0.3371\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Ball2{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(S::AbstractPointSymmetric)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nS – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Ball2{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, B::Ball2)::AbstractVector{<:AbstractFloat} where {N<:AbstractFloat}\n\nReturn the support vector of a 2-norm ball in a given direction.\n\nInput\n\nd – direction\nB – ball in the 2-norm\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the origin is returned.\n\nNotes\n\nLet c and r be the center and radius of a ball B in the 2-norm, respectively. For nonzero direction d we have\n\n_B(d) = c + r fracdd_2\n\nThis function requires computing the 2-norm of the input direction, which is performed in the given precision of the numeric datatype of both the direction and the set. Exact inputs are not supported.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Ball2{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, B::Ball2{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in a ball in the 2-norm.\n\nInput\n\nx – point/vector\nB – ball in the 2-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the 2-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff left( _i=1^n c_i - x_i^2 right)^12  r.\n\nExamples\n\njulia> B = Ball2([1., 1.], sqrt(0.5))\nLazySets.Ball2{Float64}([1.0, 1.0], 0.7071067811865476)\njulia> ∈([.5, 1.6], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Ball2{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(S::AbstractPointSymmetric{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric set.\n\nInput\n\nS – point symmetric set\n\nOutput\n\nThe center of the point symmetric set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Ball2{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(B::Ball2{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of a ball in the 2-norm.\n\nInput\n\nB – ball in the 2-norm\n\nOutput\n\nThe center of the ball in the 2-norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#Euclidean-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Euclidean norm ball",
    "category": "section",
    "text": "Ball2\ndim(::Ball2{Float64})\nσ(::AbstractVector{Float64}, ::Ball2{Float64})\n∈(::AbstractVector{Float64}, ::Ball2{Float64})\nan_element(::Ball2{Float64})\ncenter(::Ball2{Float64})"
},

{
    "location": "lib/representations.html#LazySets.BallInf",
    "page": "Common Set Representations",
    "title": "LazySets.BallInf",
    "category": "Type",
    "text": "BallInf{N<:Real} <: AbstractHyperrectangle{N}\n\nType that represents a ball in the infinity norm.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a real scalar ( 0)\n\nNotes\n\nMathematically, a ball in the infinity norm is defined as the set\n\nmathcalB_^n(c r) =  x  mathbbR^n   x - c _  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _ denotes the infinity norm, defined as  x _ = maxlimits_i=1n vert x_i vert for any x  mathbbR^n.\n\nExamples\n\nCreate the two-dimensional unit ball and compute its support function along the positive x=y direction:\n\njulia> B = BallInf(zeros(2), 1.0)\nLazySets.BallInf{Float64}([0.0, 0.0], 1.0)\njulia> dim(B)\n2\njulia> ρ([1., 1.], B)\n2.0\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}\n )::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, H::AbstractHyperrectangle{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperrectangular set.\n\nInput\n\nx – point/vector\nH – hyperrectangular set\n\nOutput\n\ntrue iff x  H.\n\nAlgorithm\n\nLet H be an n-dimensional hyperrectangular set, c_i and r_i be the box\'s center and radius and x_i be the vector x in dimension i, respectively. Then x  H iff c_i - x_i  r_i for all i=1n.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.LinAlg.norm-Tuple{LazySets.BallInf{Float64},Real}",
    "page": "Common Set Representations",
    "title": "Base.LinAlg.norm",
    "category": "Method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\nnorm(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the norm of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\nNotes\n\nThe norm of a hyperrectangular set is defined as the norm of the enclosing ball, of the given p-norm, of minimal volume that is centered in the origin.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius-Tuple{LazySets.BallInf{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.radius",
    "category": "Method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\nradius(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the radius of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center. It is the same for all corners of a hyperrectangular set.\n\n\n\nradius(B::BallInf, [p]::Real=Inf)::Real\n\nReturn the radius of a ball in the infinity norm.\n\nInput\n\nB – ball in the infinity norm\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.diameter-Tuple{LazySets.BallInf{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.diameter",
    "category": "Method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\ndiameter(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the diameter of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\nNotes\n\nThe diameter is defined as the maximum distance in the given p-norm between any two elements of the set. Equivalently, it is the diameter of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(H::AbstractHyperrectangle{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of vertices.\n\nNotes\n\nFor high dimensions, it is preferable to develop a vertex_iterator approach.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(B::BallInf{N})::Vector{N} where {N<:Real}\n\nReturn the center of a ball in the infinity norm.\n\nInput\n\nB – ball in the infinity norm\n\nOutput\n\nThe center of the ball in the infinity norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.BallInf{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(B::BallInf{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a infinity norm ball, which is the same in every dimension.\n\nInput\n\nB – infinity norm ball\n\nOutput\n\nThe box radius of the ball in the infinity norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.BallInf{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(B::BallInf{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a infinity norm ball in a given dimension.\n\nInput\n\nB – infinity norm ball\n\nOutput\n\nThe box radius of the ball in the infinity norm in the given dimension.\n\n\n\n"
},

{
    "location": "lib/representations.html#Infinity-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Infinity norm ball",
    "category": "section",
    "text": "BallInf\ndim(::BallInf{Float64})\nσ(::AbstractVector{Float64}, ::BallInf{Float64})\n∈(::AbstractVector{Float64}, ::BallInf{Float64})\nan_element(::BallInf{Float64})\nnorm(::BallInf{Float64}, ::Real)\nradius(::BallInf{Float64}, ::Real)\ndiameter(::BallInf{Float64}, ::Real)\nvertices_list(::BallInf{Float64})\nsingleton_list(::BallInf{Float64})\ncenter(::BallInf{Float64})\nradius_hyperrectangle(::BallInf{Float64})\nradius_hyperrectangle(::BallInf{Float64}, ::Int)"
},

{
    "location": "lib/representations.html#LazySets.Ball1",
    "page": "Common Set Representations",
    "title": "LazySets.Ball1",
    "category": "Type",
    "text": "Ball1{N<:Real} <: AbstractPointSymmetricPolytope{N}\n\nType that represents a ball in the 1-norm, also known as Manhattan or Taxicab norm.\n\nIt is defined as the set\n\nmathcalB_1^n(c r) =  x  mathbbR^n  _i=1^n c_i - x_i  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius.\n\nFields\n\ncenter – center of the ball as a real vector\nradius – radius of the ball as a scalar ( 0)\n\nExamples\n\nUnit ball in the 1-norm in the plane:\n\njulia> B = Ball1(zeros(2), 1.)\nLazySets.Ball1{Float64}([0.0, 0.0], 1.0)\njulia> dim(B)\n2\n\nWe evaluate the support vector in the East direction:\n\njulia> σ([0.,1], B)\n2-element Array{Float64,1}:\n 0.0\n 1.0\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, B::Ball1)::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a ball in the 1-norm in a given direction.\n\nInput\n\nd – direction\nB – ball in the 1-norm\n\nOutput\n\nSupport vector in the given direction.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, B::Ball1{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a ball in the 1-norm.\n\nInput\n\nx – point/vector\nB – ball in the 1-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the 1-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff _i=1^n c_i - x_i  r.\n\nExamples\n\njulia> B = Ball1([1., 1.], 1.);\n\njulia> ∈([.5, -.5], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(B::Ball1{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a ball in the 1-norm.\n\nInput\n\nB – ball in the 1-norm\n\nOutput\n\nA list containing the vertices of the ball in the 1-norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Ball1{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(B::Ball1{N})::Vector{N} where {N<:Real}\n\nReturn the center of a ball in the 1-norm.\n\nInput\n\nB – ball in the 1-norm\n\nOutput\n\nThe center of the ball in the 1-norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#Manhattan-norm-ball-1",
    "page": "Common Set Representations",
    "title": "Manhattan norm ball",
    "category": "section",
    "text": "Ball1\ndim(::Ball1{Float64})\nσ(::AbstractVector{Float64}, ::Ball1{Float64})\n∈(::AbstractVector{Float64}, ::Ball1{Float64})\nan_element(::Ball1{Float64})\nvertices_list(::Ball1{Float64})\nsingleton_list(::Ball1{Float64})\ncenter(::Ball1{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Ballp",
    "page": "Common Set Representations",
    "title": "LazySets.Ballp",
    "category": "Type",
    "text": "Ballp{N<:AbstractFloat} <: AbstractPointSymmetric{N}\n\nType that represents a ball in the p-norm, for 1  p  .\n\nIt is defined as the set\n\nmathcalB_p^n(c r) =  x  mathbbR^n   x - c _p  r \n\nwhere c  mathbbR^n is its center and r  mathbbR_+ its radius. Here   _p for 1  p   denotes the vector p-norm, defined as  x _p = left( sumlimits_i=1^n x_i^p right)^1p for any x  mathbbR^n.\n\nFields\n\np      – norm as a real scalar\ncenter – center of the ball as a real vector\nradius – radius of the ball as a scalar ( 0)\n\nNotes\n\nThe special cases p=1, p=2 and p= fall back to the specialized types Ball1, Ball2 and BallInf, respectively.\n\nExamples\n\nA five-dimensional ball in the p=32 norm centered at the origin of radius 0.5:\n\njulia> B = Ballp(3/2, zeros(5), 0.5)\nLazySets.Ballp{Float64}(1.5, [0.0, 0.0, 0.0, 0.0, 0.0], 0.5)\njulia> dim(B)\n5\n\nWe evaluate the support vector in direction 125:\n\njulia> σ(1.:5, B)\n5-element Array{Float64,1}:\n 0.013516\n 0.054064\n 0.121644\n 0.216256\n 0.3379\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Ballp{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(S::AbstractPointSymmetric)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nS – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Ballp{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, B::Ballp)::AbstractVector{N} where {N<:AbstractFloat}\n\nReturn the support vector of a Ballp in a given direction.\n\nInput\n\nd – direction\nB – ball in the p-norm\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the center of the ball is returned.\n\nAlgorithm\n\nThe support vector of the unit ball in the p-norm along direction d is:\n\n_mathcalB_p^n(0 1)(d) = dfractildevtildev_q\n\nwhere tildev_i = fracd_i^qd_i if d_i  0 and tildev_i = 0 otherwise, for all i=1n, and q is the conjugate number of p. By the affine transformation x = rtildex + c, one obtains that the support vector of mathcalB_p^n(c r) is\n\n_mathcalB_p^n(c r)(d) = dfracvv_q\n\nwhere v_i = c_i + rfracd_i^qd_i if d_i  0 and v_i = 0 otherwise, for all i = 1  n.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Ballp{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, B::Ballp{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in a ball in the p-norm.\n\nInput\n\nx – point/vector\nB – ball in the p-norm\n\nOutput\n\ntrue iff x  B.\n\nNotes\n\nThis implementation is worst-case optimized, i.e., it is optimistic and first computes (see below) the whole sum before comparing to the radius. In applications where the point is typically far away from the ball, a fail-fast implementation with interleaved comparisons could be more efficient.\n\nAlgorithm\n\nLet B be an n-dimensional ball in the p-norm with radius r and let c_i and x_i be the ball\'s center and the vector x in dimension i, respectively. Then x  B iff left( _i=1^n c_i - x_i^p right)^1p  r.\n\nExamples\n\njulia> B = Ballp(1.5, [1., 1.], 1.)\nLazySets.Ballp{Float64}(1.5, [1.0, 1.0], 1.0)\njulia> ∈([.5, -.5], B)\nfalse\njulia> ∈([.5, 1.5], B)\ntrue\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Ballp{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(S::AbstractPointSymmetric{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric set.\n\nInput\n\nS – point symmetric set\n\nOutput\n\nThe center of the point symmetric set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Ballp{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(B::Ballp{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of a ball in the p-norm.\n\nInput\n\nB – ball in the p-norm\n\nOutput\n\nThe center of the ball in the p-norm.\n\n\n\n"
},

{
    "location": "lib/representations.html#p-norm-ball-1",
    "page": "Common Set Representations",
    "title": "p-norm ball",
    "category": "section",
    "text": "Ballp\ndim(::Ballp{Float64})\nσ(::AbstractVector{Float64}, ::Ballp{Float64})\n∈(::AbstractVector{Float64}, ::Ballp{Float64})\nan_element(::Ballp{Float64})\ncenter(::Ballp{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Ellipsoid",
    "page": "Common Set Representations",
    "title": "LazySets.Ellipsoid",
    "category": "Type",
    "text": "Ellipsoid{N<:Real} <:  AbstractPointSymmetric{N}\n\nType that represents an ellipsoid.\n\nIt is defined as the set\n\nE = left x  mathbbR^n  (x-c)Q^-1(x-c)  1 right\n\nwhere c in mathbbR^n is its center and Q in mathbbR^nn its shape matrix, which should be a positive definite matrix. An ellipsoid can also be characterized as the image of a Euclidean ball by an invertible linear transformation.\n\nFields\n\ncenter       – center of the ellipsoid\nshape matrix – real positive definite matrix, i.e. it is equal to its transpose                   and x^mathrmTQx  0 for all nonzero x\n\nExamples\n\nIf the center is not specified, it is assumed that the center is the origin. For instance, a 3D ellipsoid with center at the origin and the shape matrix being the identity can be created with:\n\njulia> E = Ellipsoid(eye(3))\nLazySets.Ellipsoid{Float64}([0.0, 0.0, 0.0], [1.0 0.0 0.0; 0.0 1.0 0.0; 0.0 0.0 1.0])\n\njulia> dim(E)\n3\n\njulia> an_element(E)\n3-element Array{Float64,1}:\n 0.0\n 0.0\n 0.0\n\nThis ellipsoid corresponds to the unit Euclidean ball. Let\'s evaluate its support vector in a given direction:\n\njulia> σ(ones(3), E)\n3-element Array{Float64,1}:\n 0.57735\n 0.57735\n 0.57735\n\nA two-dimensional ellipsoid with given center and shape matrix:\n\njulia> E = Ellipsoid(ones(2), diagm([2.0, 0.5]))\nLazySets.Ellipsoid{Float64}([1.0, 1.0], [2.0 0.0; 0.0 0.5])\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Ellipsoid{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N},\n           E::Ellipsoid{N})::AbstractVector{<:AbstractFloat} where {N<:AbstractFloat}\n\nReturn the support vector of an ellipsoid in a given direction.\n\nInput\n\nd – direction\nE – ellipsoid\n\nOutput\n\nSupport vector in the given direction.\n\nAlgorithm\n\nLet E be an ellipsoid of center c and shape matrix Q = BB^mathrmT. Its support vector along direction d can be deduced from that of the unit Euclidean ball mathcalB_2 using the algebraic relations for the support vector,\n\n_BmathcalB_2  c(d) = c + B_mathcalB_2 (B^mathrmT d)\n= c + dfracQdsqrtd^mathrmTQ d\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Ellipsoid{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(E::Ellipsoid{N})::Vector{N} where {N<:AbstractFloat}\n\nReturn the center of the ellipsoid.\n\nInput\n\nE – ellipsoid\n\nOutput\n\nThe center of the ellipsoid.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Ellipsoid{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, E::Ellipsoid{N})::Bool where {N<:AbstractFloat}\n\nCheck whether a given point is contained in an ellipsoid.\n\nInput\n\nx – point/vector\nE – ellipsoid\n\nOutput\n\ntrue iff x ∈ E.\n\nAlgorithm\n\nThe point x belongs to the ellipsoid of center c and shape matrix Q if and only if\n\n(x-c)^mathrmT Q^-1 (x-c)  1\n\n\n\n"
},

{
    "location": "lib/representations.html#Ellipsoid-1",
    "page": "Common Set Representations",
    "title": "Ellipsoid",
    "category": "section",
    "text": "Ellipsoid\nσ(::AbstractVector{Float64}, ::Ellipsoid{Float64})\ncenter(::Ellipsoid{Float64})\n∈(::AbstractVector{Float64}, ::Ellipsoid{Float64})"
},

{
    "location": "lib/representations.html#LazySets.EmptySet",
    "page": "Common Set Representations",
    "title": "LazySets.EmptySet",
    "category": "Type",
    "text": "EmptySet{N<:Real} <: LazySet{N}\n\nType that represents the empty set, i.e., the set with no elements.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.∅",
    "page": "Common Set Representations",
    "title": "LazySets.∅",
    "category": "Constant",
    "text": "∅\n\nAn EmptySet instance of type Float64.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.EmptySet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(∅::EmptySet)\n\nReturn the dimension of the empty set, which is -1 by convention.\n\nInput\n\n∅ – an empty set\n\nOutput\n\n-1 by convention.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.EmptySet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d, ∅)\n\nReturn the support vector of an empty set.\n\nInput\n\n∅ – an empty set\n\nOutput\n\nAn error.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.EmptySet{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector, ∅::EmptySet)::Bool\n\nCheck whether a given point is contained in an empty set.\n\nInput\n\nx – point/vector\n∅ – empty set\n\nOutput\n\nThe output is always false.\n\nExamples\n\njulia> ∈([1.0, 0.0], ∅)\nfalse\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.EmptySet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(∅::EmptySet)\n\nReturn some element of an empty set.\n\nInput\n\n∅ – empty set\n\nOutput\n\nAn error.\n\n\n\n"
},

{
    "location": "lib/representations.html#EmptySet-1",
    "page": "Common Set Representations",
    "title": "EmptySet",
    "category": "section",
    "text": "EmptySet\n∅\ndim(::EmptySet{Float64})\nσ(::AbstractVector{Float64}, ::EmptySet{Float64})\n∈(::AbstractVector{Float64}, ::EmptySet{Float64})\nan_element(::EmptySet{Float64})"
},

{
    "location": "lib/representations.html#LazySets.HalfSpace",
    "page": "Common Set Representations",
    "title": "LazySets.HalfSpace",
    "category": "Type",
    "text": "HalfSpace{N<:Real} <: LazySet{N}\n\nType that represents a (closed) half-space of the form ax  b.\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe set y  0 in the plane:\n\njulia> HalfSpace([0, -1.], 0.)\nLazySets.HalfSpace{Float64}([0.0, -1.0], 0.0)\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.LinearConstraint",
    "page": "Common Set Representations",
    "title": "LazySets.LinearConstraint",
    "category": "Type",
    "text": "LinearConstraint\n\nAlias for HalfSpace\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(hs::HalfSpace)::Int\n\nReturn the dimension of a half-space.\n\nInput\n\nhs – half-space\n\nOutput\n\nThe ambient dimension of the half-space.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, hs::HalfSpace)::AbstractVector{<:Real}\n\nReturn the support vector of a half-space.\n\nInput\n\nd  – direction\nhs – half-space\n\nOutput\n\nThe support vector in the given direction, which is only defined in the following two cases:\n\nThe direction has norm zero.\nThe direction is the half-space\'s normal direction.\n\nIn both cases the result is any point on the boundary (the defining hyperplane). Otherwise this function throws an error.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(hs::HalfSpace{N})::Vector{N} where {N<:Real}\n\nReturn some element of a half-space.\n\nInput\n\nhs – half-space\n\nOutput\n\nAn element on the defining hyperplane.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, hs::HalfSpace{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a half-space.\n\nInput\n\nx – point/vector\nhs – half-space\n\nOutput\n\ntrue iff x  hs.\n\nAlgorithm\n\nWe just check if x satisfies ax  b.\n\n\n\n"
},

{
    "location": "lib/representations.html#Half-Space-1",
    "page": "Common Set Representations",
    "title": "Half-Space",
    "category": "section",
    "text": "HalfSpace\nLinearConstraint\ndim(::HalfSpace{Float64})\nσ(::AbstractVector{Float64}, ::HalfSpace{Float64})\nan_element(::HalfSpace{Float64})\n∈(::AbstractVector{Float64}, ::HalfSpace{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Hyperplane",
    "page": "Common Set Representations",
    "title": "LazySets.Hyperplane",
    "category": "Type",
    "text": "Hyperplane{N<:Real} <: LazySet{N}\n\nType that represents a hyperplane of the form ax = b.\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe plane y = 0:\n\njulia> Hyperplane([0, 1.], 0.)\nLazySets.Hyperplane{Float64}([0.0, 1.0], 0.0)\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Hyperplane{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(hp::Hyperplane)::Int\n\nReturn the dimension of a hyperplane.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nThe ambient dimension of the hyperplane.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Hyperplane{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, hp::Hyperplane)::AbstractVector{<:Real}\n\nReturn the support vector of a hyperplane.\n\nInput\n\nd  – direction\nhp – hyperplane\n\nOutput\n\nThe support vector in the given direction, which is only defined in the following two cases:\n\nThe direction has norm zero.\nThe direction is the hyperplane\'s normal direction.\n\nIn both cases the result is any point on the hyperplane. Otherwise this function throws an error.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Hyperplane{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(hp::Hyperplane{N})::Vector{N} where {N<:Real}\n\nReturn some element of a hyperplane.\n\nInput\n\nhp – hyperplane\n\nOutput\n\nAn element in the hyperplane.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Hyperplane{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, hp::Hyperplane{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperplane.\n\nInput\n\nx – point/vector\nhp – hyperplane\n\nOutput\n\ntrue iff x  hp.\n\nAlgorithm\n\nWe just check if x satisfies ax = b.\n\n\n\n"
},

{
    "location": "lib/representations.html#Hyperplane-1",
    "page": "Common Set Representations",
    "title": "Hyperplane",
    "category": "section",
    "text": "Hyperplane\ndim(::Hyperplane{Float64})\nσ(::AbstractVector{Float64}, ::Hyperplane{Float64})\nan_element(::Hyperplane{Float64})\n∈(::AbstractVector{Float64}, ::Hyperplane{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Hyperrectangle",
    "page": "Common Set Representations",
    "title": "LazySets.Hyperrectangle",
    "category": "Type",
    "text": "Hyperrectangle{N<:Real} <: AbstractHyperrectangle{N}\n\nType that represents a hyperrectangle.\n\nA hyperrectangle is the Cartesian product of one-dimensional intervals.\n\nFields\n\ncenter – center of the hyperrectangle as a real vector\nradius – radius of the ball as a real vector, i.e., half of its width along             each coordinate direction\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.Hyperrectangle-Tuple{}",
    "page": "Common Set Representations",
    "title": "LazySets.Hyperrectangle",
    "category": "Method",
    "text": "Hyperrectangle(;kwargs...)\n\nConstruct a hyperrectangle from keyword arguments.\n\nInput\n\nkwargs – keyword arguments; two combinations are allowed:\ncenter, radius – vectors\nhigh, low      – vectors (if both center and radius are also                       defined, those are chosen instead)\n\nOutput\n\nA hyperrectangle.\n\nExamples\n\nThe following three constructions are equivalent:\n\njulia> c = ones(2);\n\njulia> r = [0.1, 0.2];\n\njulia> l = [0.9, 0.8];\n\njulia> h = [1.1, 1.2];\n\njulia> H1 = Hyperrectangle(c, r)\nLazySets.Hyperrectangle{Float64}([1.0, 1.0], [0.1, 0.2])\njulia> H2 = Hyperrectangle(center=c, radius=r)\nLazySets.Hyperrectangle{Float64}([1.0, 1.0], [0.1, 0.2])\njulia> H3 = Hyperrectangle(low=l, high=h)\nLazySets.Hyperrectangle{Float64}([1.0, 1.0], [0.1, 0.2])\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}\n )::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, H::AbstractHyperrectangle{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperrectangular set.\n\nInput\n\nx – point/vector\nH – hyperrectangular set\n\nOutput\n\ntrue iff x  H.\n\nAlgorithm\n\nLet H be an n-dimensional hyperrectangular set, c_i and r_i be the box\'s center and radius and x_i be the vector x in dimension i, respectively. Then x  H iff c_i - x_i  r_i for all i=1n.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.LinAlg.norm-Tuple{LazySets.Hyperrectangle{Float64},Real}",
    "page": "Common Set Representations",
    "title": "Base.LinAlg.norm",
    "category": "Method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\nnorm(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the norm of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\nNotes\n\nThe norm of a hyperrectangular set is defined as the norm of the enclosing ball, of the given p-norm, of minimal volume that is centered in the origin.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius-Tuple{LazySets.Hyperrectangle{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.radius",
    "category": "Method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\nradius(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the radius of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\nNotes\n\nThe radius is defined as the radius of the enclosing ball of the given p-norm of minimal volume with the same center. It is the same for all corners of a hyperrectangular set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.diameter-Tuple{LazySets.Hyperrectangle{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.diameter",
    "category": "Method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\ndiameter(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the diameter of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\nNotes\n\nThe diameter is defined as the maximum distance in the given p-norm between any two elements of the set. Equivalently, it is the diameter of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(H::AbstractHyperrectangle{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of vertices.\n\nNotes\n\nFor high dimensions, it is preferable to develop a vertex_iterator approach.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the center of a hyperrectangle.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe center of the hyperrectangle.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a hyperrectangle in every dimension.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe box radius of the hyperrectangle.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Hyperrectangle{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(H::Hyperrectangle{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a hyperrectangle in a given dimension.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nThe radius in the given dimension.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.high-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.high",
    "category": "Method",
    "text": "high(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the higher coordinates of a hyperrectangle.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nA vector with the higher coordinates of the hyperrectangle, one entry per dimension.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.low-Tuple{LazySets.Hyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.low",
    "category": "Method",
    "text": "low(H::Hyperrectangle{N})::Vector{N} where {N<:Real}\n\nReturn the lower coordinates of a hyperrectangle.\n\nInput\n\nH – hyperrectangle\n\nOutput\n\nA vector with the lower coordinates of the hyperrectangle, one entry per dimension.\n\n\n\n"
},

{
    "location": "lib/representations.html#Hyperrectangles-1",
    "page": "Common Set Representations",
    "title": "Hyperrectangles",
    "category": "section",
    "text": "Hyperrectangle\nHyperrectangle(;kwargs...)\ndim(::Hyperrectangle{Float64})\nσ(::AbstractVector{Float64}, ::Hyperrectangle{Float64})\n∈(::AbstractVector{Float64}, ::Hyperrectangle{Float64})\nan_element(::Hyperrectangle{Float64})\nnorm(::Hyperrectangle{Float64}, ::Real)\nradius(::Hyperrectangle{Float64}, ::Real)\ndiameter(::Hyperrectangle{Float64}, ::Real)\nvertices_list(::Hyperrectangle{Float64})\nsingleton_list(::Hyperrectangle{Float64})\ncenter(::Hyperrectangle{Float64})\nradius_hyperrectangle(::Hyperrectangle{Float64})\nradius_hyperrectangle(::Hyperrectangle{Float64}, ::Int)\nhigh(::Hyperrectangle{Float64})\nlow(::Hyperrectangle{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Line",
    "page": "Common Set Representations",
    "title": "LazySets.Line",
    "category": "Type",
    "text": "Line{N<:Real} <: LazySet{N}\n\nType that represents a line in 2D of the form ax = b (i.e., a special case of a Hyperplane).\n\nFields\n\na – normal direction\nb – constraint\n\nExamples\n\nThe line y = -x + 1:\n\njulia> Line([1., 1.], 1.)\nLazySets.Line{Float64}([1.0, 1.0], 1.0)\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Line{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(L::Line)::Int\n\nReturn the ambient dimension of a line.\n\nInput\n\nL – line\n\nOutput\n\nThe ambient dimension of the line, which is 2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Line{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, L::Line)::AbstractVector{<:Real}\n\nReturn the support vector of a line in a given direction.\n\nInput\n\nd – direction\nL – line\n\nOutput\n\nThe support vector in the given direction, which is defined the same way as for the more general Hyperplane.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.intersection-Tuple{LazySets.Line{Float64},LazySets.Line{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.intersection",
    "category": "Method",
    "text": "intersection(L1::Line{N}, L2::Line{N})::Vector{N} where {N<:Real}\n\nReturn the intersection of two 2D lines.\n\nInput\n\nL1 – first line\nL2 – second line\n\nOutput\n\nIf the lines are parallel or identical, the result is an empty vector. Otherwise the result is the only intersection point.\n\nExamples\n\nThe line y = -x + 1 intersected with the line y = x:\n\njulia> intersection(Line([-1., 1.], 0.), Line([1., 1.], 1.))\n2-element Array{Float64,1}:\n 0.5\n 0.5\njulia> intersection(Line([1., 1.], 1.), Line([1., 1.], 1.))\n0-element Array{Float64,1}\n\n\n\n\n"
},

{
    "location": "lib/representations.html#Line-1",
    "page": "Common Set Representations",
    "title": "Line",
    "category": "section",
    "text": "Line\ndim(::Line{Float64})\nσ(::AbstractVector{Float64}, ::Line{Float64})\nintersection(::Line{Float64}, ::Line{Float64})"
},

{
    "location": "lib/representations.html#LazySets.LineSegment",
    "page": "Common Set Representations",
    "title": "LazySets.LineSegment",
    "category": "Type",
    "text": "LineSegment{N<:Real} <: LazySet{N}\n\nType that represents a line segment in 2D between two points p and q.\n\nFields\n\np – first point\nq – second point\n\nExamples\n\nA line segment along the x = y diagonal:\n\njulia> s = LineSegment([0., 0], [1., 1.])\nLazySets.LineSegment{Float64}([0.0, 0.0], [1.0, 1.0])\njulia> dim(s)\n2\n\nUse plot(s) to plot the extreme points of s and the line segment joining them. Membership test is computed with ∈ (in):\n\njulia> [0., 0] ∈ s && [.25, .25] ∈ s && [1., 1] ∈ s && !([.5, .25] ∈ s)\ntrue\n\nWe can check the intersection with another line segment, and optionally compute a witness (which is just the common point in this case):\n\njulia> sn = LineSegment([1., 0], [0., 1.])\nLazySets.LineSegment{Float64}([1.0, 0.0], [0.0, 1.0])\njulia> isempty(s ∩ sn)\nfalse\njulia> is_intersection_empty(s, sn, true)\n(false, [0.5, 0.5])\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.LineSegment{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(L::LineSegment)::Int\n\nReturn the ambient dimension of a line segment.\n\nInput\n\nL – line segment\n\nOutput\n\nThe ambient dimension of the line segment, which is 2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.LineSegment{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, L::LineSegment)::AbstractVector{<:Real}\n\nReturn the support vector of a line segment in a given direction.\n\nInput\n\nd – direction\nL – line segment\n\nOutput\n\nThe support vector in the given direction.\n\nAlgorithm\n\nIf the angle between the vector q - p and d is bigger than 90° and less than 270° (measured in counter-clockwise order), the result is p, otherwise it is q. If the angle is exactly 90° or 270°, or if the direction has norm zero, this implementation returns q.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.LineSegment{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, L::LineSegment{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a line segment.\n\nInput\n\nx – point/vector\nL – line segment\n\nOutput\n\ntrue iff x  L.\n\nAlgorithm\n\nLet L = (p q) be the line segment with extremes p and q, and let x be the given point.\n\nA necessary condition for x  (p q) is that the three points are aligned, thus their cross product should be zero.\nIt remains to check that x belongs to the box approximation of L. This amounts to comparing each coordinate with those of the extremes p and q.\n\nNotes\n\nThe algorithm is inspired from here.\n\n\n\n"
},

{
    "location": "lib/representations.html#Line-segment-1",
    "page": "Common Set Representations",
    "title": "Line segment",
    "category": "section",
    "text": "LineSegment\ndim(::LineSegment{Float64})\nσ(::AbstractVector{Float64}, ::LineSegment{Float64})\n∈(::AbstractVector{Float64}, ::LineSegment{Float64})"
},

{
    "location": "lib/representations.html#Polygons-1",
    "page": "Common Set Representations",
    "title": "Polygons",
    "category": "section",
    "text": ""
},

{
    "location": "lib/representations.html#LazySets.HPolygon",
    "page": "Common Set Representations",
    "title": "LazySets.HPolygon",
    "category": "Type",
    "text": "HPolygon{N<:Real} <: AbstractHPolygon{N}\n\nType that represents a convex polygon in constraint representation whose edges are sorted in counter-clockwise fashion with respect to their normal directions.\n\nFields\n\nconstraints – list of linear constraints, sorted by the angle\n\nNotes\n\nThe default constructor assumes that the given list of edges is sorted. It does not perform any sorting. Use addconstraint! to iteratively add the edges in a sorted way.\n\nHPolygon(constraints::Vector{LinearConstraint{<:Real}}) – default constructor\nHPolygon() – constructor with no constraints\nHPolygon(S::LazySet) – constructor from another set\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPolygon)::Int\n\nReturn the ambient dimension of a polygon.\n\nInput\n\nP – polygon\n\nOutput\n\nThe ambient dimension of the polygon, which is 2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, P::HPolygon{N})::Vector{N} where {N<:Real}\n\nReturn the support vector of a polygon in a given direction.\n\nInput\n\nd – direction\nP – polygon in constraint representation\n\nOutput\n\nThe support vector in the given direction. The result is always one of the vertices; in particular, if the direction has norm zero, any vertex is returned.\n\nAlgorithm\n\nComparison of directions is performed using polar angles; see the overload of <= for two-dimensional vectors.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, P::AbstractHPolygon{N})::Bool where {N<:Real}\n\nCheck whether a given 2D point is contained in a polygon in constraint representation.\n\nInput\n\nx – two-dimensional point/vector\nP – polygon in constraint representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation checks if the point lies on the outside of each edge.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractHPolygon{N})::Vector{N} where {N<:Real}\n\nReturn some element of a polygon in constraint representation.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nA vertex of the polygon in constraint representation (the first one in the order of the constraints).\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(P::AbstractHPolygon{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a polygon in constraint representation.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nList of vertices.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tohrep-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tohrep",
    "category": "Method",
    "text": "tohrep(P::AbstractHPolygon{N})::AbstractHPolygon{N} where {N<:Real}\n\nBuild a contraint representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe identity, i.e., the same polygon instance.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tovrep-Tuple{LazySets.HPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tovrep",
    "category": "Method",
    "text": "tovrep(P::AbstractHPolygon{N})::VPolygon{N} where {N<:Real}\n\nBuild a vertex representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe same polygon but in vertex representation, a VPolygon.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.addconstraint!-Tuple{LazySets.HPolygon{Float64},LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.addconstraint!",
    "category": "Method",
    "text": "addconstraint!(P::AbstractHPolygon{N},\n               constraint::LinearConstraint{N})::Void where {N<:Real}\n\nAdd a linear constraint to a polygon in constraint representation, keeping the constraints sorted by their normal directions.\n\nInput\n\nP          – polygon in constraint representation\nconstraint – linear constraint to add\n\nOutput\n\nNothing.\n\n\n\n"
},

{
    "location": "lib/representations.html#Constraint-representation-1",
    "page": "Common Set Representations",
    "title": "Constraint representation",
    "category": "section",
    "text": "HPolygon\ndim(::HPolygon{Float64})\nσ(::AbstractVector{Float64}, ::HPolygon{Float64})\n∈(::AbstractVector{Float64}, ::HPolygon{Float64})\nan_element(::HPolygon{Float64})\nvertices_list(::HPolygon{Float64})\nsingleton_list(::HPolygon{Float64})\ntohrep(::HPolygon{Float64})\ntovrep(::HPolygon{Float64})\naddconstraint!(::HPolygon{Float64}, ::LinearConstraint{Float64})"
},

{
    "location": "lib/representations.html#LazySets.HPolygonOpt",
    "page": "Common Set Representations",
    "title": "LazySets.HPolygonOpt",
    "category": "Type",
    "text": "HPolygonOpt{N<:Real} <: AbstractHPolygon{N}\n\nType that represents a convex polygon in constraint representation whose edges are sorted in counter-clockwise fashion with respect to their normal directions. This is a refined version of HPolygon.\n\nFields\n\nconstraints – list of linear constraints\nind – index in the list of constraints to begin the search to evaluate the          support function\n\nNotes\n\nThis structure is optimized to evaluate the support function/vector with a large sequence of directions that are close to each other. The strategy is to have an index that can be used to warm-start the search for optimal values in the support vector computation.\n\nThe default constructor assumes that the given list of edges is sorted. It does not perform any sorting. Use addconstraint! to iteratively add the edges in a sorted way.\n\nHPolygonOpt(constraints::Vector{LinearConstraint{<:Real}}, [ind]::Int) – default constructor with optional index\nHPolygonOpt(S::LazySet) – constructor from another set\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPolygon)::Int\n\nReturn the ambient dimension of a polygon.\n\nInput\n\nP – polygon\n\nOutput\n\nThe ambient dimension of the polygon, which is 2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, P::HPolygonOpt{N})::Vector{N} where {N<:Real}\n\nReturn the support vector of an optimized polygon in a given direction.\n\nInput\n\nd – direction\nP – optimized polygon in constraint representation\n\nOutput\n\nThe support vector in the given direction. The result is always one of the vertices; in particular, if the direction has norm zero, any vertex is returned.\n\nAlgorithm\n\nComparison of directions is performed using polar angles; see the overload of <= for two-dimensional vectors.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, P::AbstractHPolygon{N})::Bool where {N<:Real}\n\nCheck whether a given 2D point is contained in a polygon in constraint representation.\n\nInput\n\nx – two-dimensional point/vector\nP – polygon in constraint representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation checks if the point lies on the outside of each edge.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractHPolygon{N})::Vector{N} where {N<:Real}\n\nReturn some element of a polygon in constraint representation.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nA vertex of the polygon in constraint representation (the first one in the order of the constraints).\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(P::AbstractHPolygon{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a polygon in constraint representation.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nList of vertices.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tohrep-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tohrep",
    "category": "Method",
    "text": "tohrep(P::AbstractHPolygon{N})::AbstractHPolygon{N} where {N<:Real}\n\nBuild a contraint representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe identity, i.e., the same polygon instance.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tovrep-Tuple{LazySets.HPolygonOpt{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tovrep",
    "category": "Method",
    "text": "tovrep(P::AbstractHPolygon{N})::VPolygon{N} where {N<:Real}\n\nBuild a vertex representation of the given polygon.\n\nInput\n\nP – polygon in constraint representation\n\nOutput\n\nThe same polygon but in vertex representation, a VPolygon.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.addconstraint!-Tuple{LazySets.HPolygonOpt{Float64},LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.addconstraint!",
    "category": "Method",
    "text": "addconstraint!(P::AbstractHPolygon{N},\n               constraint::LinearConstraint{N})::Void where {N<:Real}\n\nAdd a linear constraint to a polygon in constraint representation, keeping the constraints sorted by their normal directions.\n\nInput\n\nP          – polygon in constraint representation\nconstraint – linear constraint to add\n\nOutput\n\nNothing.\n\n\n\n"
},

{
    "location": "lib/representations.html#Optimized-constraint-representation-1",
    "page": "Common Set Representations",
    "title": "Optimized constraint representation",
    "category": "section",
    "text": "HPolygonOpt\ndim(::HPolygonOpt{Float64})\nσ(::AbstractVector{Float64}, ::HPolygonOpt{Float64})\n∈(::AbstractVector{Float64}, ::HPolygonOpt{Float64})\nan_element(::HPolygonOpt{Float64})\nvertices_list(::HPolygonOpt{Float64})\nsingleton_list(::HPolygonOpt{Float64})\ntohrep(::HPolygonOpt{Float64})\ntovrep(::HPolygonOpt{Float64})\naddconstraint!(::HPolygonOpt{Float64}, ::LinearConstraint{Float64})"
},

{
    "location": "lib/representations.html#LazySets.VPolygon",
    "page": "Common Set Representations",
    "title": "LazySets.VPolygon",
    "category": "Type",
    "text": "VPolygon{N<:Real} <: AbstractPolygon{N}\n\nType that represents a polygon by its vertices.\n\nFields\n\nvertices_list – the list of vertices\n\nNotes\n\nThe constructor of VPolygon runs a convex hull algorithm, and the given vertices are sorted in counter-clockwise fashion. The constructor flag apply_convex_hull can be used to skip the computation of the convex hull.\n\nVPolygon(vertices_list::Vector{Vector{N}};           apply_convex_hull::Bool=true,           algorithm::String=\"monotone_chain\")\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPolygon)::Int\n\nReturn the ambient dimension of a polygon.\n\nInput\n\nP – polygon\n\nOutput\n\nThe ambient dimension of the polygon, which is 2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, P::VPolygon{N})::Vector{N} where {N<:Real}\n\nReturn the support vector of a polygon in a given direction.\n\nInput\n\nd – direction\nP – polygon in vertex representation\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the first vertex is returned.\n\nAlgorithm\n\nThis implementation performs a brute-force search, comparing the projection of each vector along the given direction. It runs in O(n) where n is the number of vertices.\n\nNotes\n\nFor arbitrary points without structure this is the best one can do. However, a more efficient approach can be used if the vertices of the polygon have been sorted in counter-clockwise fashion. In that case a binary search algorithm can be used that runs in O(log n). See issue #40.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, P::VPolygon{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a polygon in vertex representation.\n\nInput\n\nx – point/vector\nP – polygon in vertex representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation exploits that the polygon\'s vertices are sorted in counter-clockwise fashion. Under this assumption we can just check if the vertex lies on the left of each edge, using the dot product.\n\nExamples\n\njulia> P = VPolygon([[2.0, 3.0], [3.0, 1.0], [5.0, 1.0], [4.0, 5.0]];\n                    apply_convex_hull=false);\n\njulia> ∈([4.5, 3.1], P)\nfalse\njulia> ∈([4.5, 3.0], P)\ntrue\njulia> ∈([4.4, 3.4], P)  #  point lies on the edge -> floating point error\nfalse\njulia> P = VPolygon([[2//1, 3//1], [3//1, 1//1], [5//1, 1//1], [4//1, 5//1]];\n                     apply_convex_hull=false);\n\njulia> ∈([44//10, 34//10], P)  #  with rational numbers the answer is correct\ntrue\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::VPolygon{N})::Vector{N} where {N<:Real}\n\nReturn some element of a polygon in vertex representation.\n\nInput\n\nP – polygon in vertex representation\n\nOutput\n\nThe first vertex of the polygon in vertex representation.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(P::VPolygon{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a convex polygon in vertex representation.\n\nInput\n\nP – a polygon vertex representation\n\nOutput\n\nList of vertices.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tohrep-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tohrep",
    "category": "Method",
    "text": "tohrep(P::VPolygon{N})::AbstractHPolygon{N} where {N<:Real}\n\nBuild a constraint representation of the given polygon.\n\nInput\n\nP – polygon in vertex representation\n\nOutput\n\nThe same polygon but in constraint representation, an AbstractHPolygon.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.tovrep-Tuple{LazySets.VPolygon{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.tovrep",
    "category": "Method",
    "text": "tovrep(P::VPolygon{N})::VPolygon{N} where {N<:Real}\n\nBuild a vertex representation of the given polygon.\n\nInput\n\nP – polygon in vertex representation\n\nOutput\n\nThe identity, i.e., the same polygon instance.\n\n\n\n"
},

{
    "location": "lib/representations.html#Vertex-representation-1",
    "page": "Common Set Representations",
    "title": "Vertex representation",
    "category": "section",
    "text": "VPolygon\ndim(::VPolygon{Float64})\nσ(::AbstractVector{Float64}, ::VPolygon{Float64})\n∈(::AbstractVector{Float64}, ::VPolygon{Float64})\nan_element(::VPolygon{Float64})\nvertices_list(::VPolygon{Float64})\nsingleton_list(::VPolygon{Float64})\ntohrep(::VPolygon{Float64})\ntovrep(::VPolygon{Float64})"
},

{
    "location": "lib/representations.html#LazySets.jump2pi",
    "page": "Common Set Representations",
    "title": "LazySets.jump2pi",
    "category": "Function",
    "text": "jump2pi(x::N)::N where {N<:AbstractFloat}\n\nReturn x + 2 if x is negative, otherwise return x.\n\nInput\n\nx – real scalar\n\nOutput\n\nx + 2 if x is negative, x otherwise.\n\nExamples\n\njulia> import LazySets.jump2pi\n\njulia> jump2pi(0.0)\n0.0\n\njulia> jump2pi(-0.5)\n5.783185307179586\n\njulia> jump2pi(0.5)\n0.5\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:<=-Tuple{AbstractArray{Float64,1},AbstractArray{Float64,1}}",
    "page": "Common Set Representations",
    "title": "Base.:<=",
    "category": "Method",
    "text": "<=(u::AbstractVector{N}, v::AbstractVector{N})::Bool where {N<:AbstractFloat}\n\nCompares two 2D vectors by their direction.\n\nInput\n\nu –  first 2D direction\nv –  second 2D direction\n\nOutput\n\nTrue iff arg(u) 2  arg(v) 2\n\nNotes\n\nThe argument is measured in counter-clockwise fashion, with the 0 being the direction (1, 0).\n\nAlgorithm\n\nThe implementation uses the arctangent function with sign, atan2.\n\n\n\n<=(u::AbstractVector{N}, v::AbstractVector{N})::Bool where {N<:Real}\n\nCompares two 2D vectors by their direction.\n\nInput\n\nu –  first 2D direction\nv –  second 2D direction\n\nOutput\n\nTrue iff arg(u) 2  arg(v) 2\n\nNotes\n\nThe argument is measured in counter-clockwise fashion, with the 0 being the direction (1, 0).\n\nAlgorithm\n\nThe implementation checks the quadrant of each direction, and compares directions using the right-hand rule. In particular, it doesn\'t use the arctangent.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.quadrant-Tuple{AbstractArray{Float64,1}}",
    "page": "Common Set Representations",
    "title": "LazySets.quadrant",
    "category": "Method",
    "text": "quadrant(w::AbstractVector{N})::Int where {N<:Real}\n\nCompute the quadrant where the direction w belongs.\n\nInput\n\nw –  direction\n\nOutput\n\nAn integer from 0 to 3, with the following convention:\n\n     ^\n   1 | 0\n  ---+-->\n   2 | 3\n\nAlgorithm\n\nThe idea is to encode the following logic function: 11  0 01  1 00  2 10  3, according to the convention of above.\n\nThis function is inspired from AGPX\'s answer in: Sort points in clockwise order?\n\n\n\n"
},

{
    "location": "lib/representations.html#Sorting-directions-1",
    "page": "Common Set Representations",
    "title": "Sorting directions",
    "category": "section",
    "text": "LazySets.jump2pi\n<=(::AbstractVector{Float64}, ::AbstractVector{Float64})\nLazySets.quadrant(w::AbstractVector{Float64})"
},

{
    "location": "lib/representations.html#LazySets.HPolytope",
    "page": "Common Set Representations",
    "title": "LazySets.HPolytope",
    "category": "Type",
    "text": "HPolytope{N<:Real} <: AbstractPolytope{N}\n\nType that represents a convex polytope in H-representation.\n\nFields\n\nconstraints – vector of linear constraints\n\nNote\n\nThis type is more appropriately a polyhedron, because no check in the constructor is made that the constraints determine a bounded set from the finite intersection of half-spaces. This is a running assumption in this type.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.HPolytope}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::HPolytope)::Int\n\nReturn the dimension of a polytope in H-representation.\n\nInput\n\nP  – polytope in H-representation\n\nOutput\n\nThe ambient dimension of the polytope in H-representation. If it has no constraints, the result is -1.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.addconstraint!-Tuple{LazySets.HPolytope{Float64},LazySets.HalfSpace{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.addconstraint!",
    "category": "Method",
    "text": "addconstraint!(P::HPolytope{N},\n               constraint::LinearConstraint{N})::Void where {N<:Real}\n\nAdd a linear constraint to a polyhedron in H-representation.\n\nInput\n\nP          – polyhedron in H-representation\nconstraint – linear constraint to add\n\nOutput\n\nNothing.\n\nNotes\n\nIt is left to the user to guarantee that the dimension of all linear constraints is the same.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.constraints_list-Tuple{LazySets.HPolytope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.constraints_list",
    "category": "Method",
    "text": "constraints_list(P::HPolytope{N})::Vector{LinearConstraint{N}} where {N<:Real}\n\nReturn the list of constraints defining a polyhedron in H-representation.\n\nInput\n\nP – polytope in H-representation\n\nOutput\n\nThe list of constraints of the polyhedron.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.HPolytope}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, P::HPolytope)::Vector{<:Real}\n\nReturn the support vector of a polyhedron (in H-representation) in a given direction.\n\nInput\n\nd – direction\nP – polyhedron in H-representation\n\nOutput\n\nThe support vector in the given direction.\n\nAlgorithm\n\nThis implementation uses GLPKSolverLP as linear programming backend.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.HPolytope{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, P::HPolytope{N})::Bool where {N<:Real}\n\nCheck whether a given 2D point is contained in a polytope in constraint representation.\n\nInput\n\nx – two-dimensional point/vector\nP – polytope in constraint representation\n\nOutput\n\ntrue iff x  P.\n\nAlgorithm\n\nThis implementation checks if the point lies on the outside of each hyperplane. This is equivalent to checking if the point lies in each half-space.\n\n\n\n"
},

{
    "location": "lib/representations.html#Polytopes-1",
    "page": "Common Set Representations",
    "title": "Polytopes",
    "category": "section",
    "text": "HPolytope\ndim(P::HPolytope)\naddconstraint!(P::HPolytope{Float64}, constraint::LinearConstraint{Float64})\nconstraints_list(P::HPolytope{Float64})\nσ(d::AbstractVector{Float64}, P::HPolytope)\n∈(::AbstractVector{Float64}, ::HPolytope{Float64})"
},

{
    "location": "lib/representations.html#LazySets.Singleton",
    "page": "Common Set Representations",
    "title": "LazySets.Singleton",
    "category": "Type",
    "text": "Singleton{N<:Real} <: AbstractSingleton{N}\n\nType that represents a singleton, that is, a set with a unique element.\n\nFields\n\nelement – the only element of the set\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}\n )::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\nσ(d::AbstractVector{N}, S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the support vector of a set with a single value.\n\nInput\n\nd – direction\nS – set with a single value\n\nOutput\n\nThe support vector, which is the set\'s vector itself, irrespective of the given direction.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, H::AbstractHyperrectangle{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperrectangular set.\n\nInput\n\nx – point/vector\nH – hyperrectangular set\n\nOutput\n\ntrue iff x  H.\n\nAlgorithm\n\nLet H be an n-dimensional hyperrectangular set, c_i and r_i be the box\'s center and radius and x_i be the vector x in dimension i, respectively. Then x  H iff c_i - x_i  r_i for all i=1n.\n\n\n\n∈(x::AbstractVector{N}, S::AbstractSingleton{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a set with a single value.\n\nInput\n\nx – point/vector\nS – set with a single value\n\nOutput\n\ntrue iff x  S.\n\nNotes\n\nThis implementation performs an exact comparison, which may be insufficient with floating point computations.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.LinAlg.norm-Tuple{LazySets.Singleton{Float64},Real}",
    "page": "Common Set Representations",
    "title": "Base.LinAlg.norm",
    "category": "Method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\nnorm(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the norm of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\nNotes\n\nThe norm of a hyperrectangular set is defined as the norm of the enclosing ball, of the given p-norm, of minimal volume that is centered in the origin.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.diameter-Tuple{LazySets.Singleton{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.diameter",
    "category": "Method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\ndiameter(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the diameter of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\nNotes\n\nThe diameter is defined as the maximum distance in the given p-norm between any two elements of the set. Equivalently, it is the diameter of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(H::AbstractHyperrectangle{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of vertices.\n\nNotes\n\nFor high dimensions, it is preferable to develop a vertex_iterator approach.\n\n\n\nvertices_list(S::AbstractSingleton{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nA list containing only a single vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the center of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe only element of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a set with a single value in every dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe zero vector.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.Singleton{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a set with a single value in a given dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nZero.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\nan_element(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn some element of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe only element in the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{LazySets.Singleton{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "Method",
    "text": "element(S::Singleton{N})::Vector{N} where {N<:Real}\n\nReturn the element of a singleton.\n\nInput\n\nS – singleton\n\nOutput\n\nThe element of the singleton.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{LazySets.Singleton{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "Method",
    "text": "element(S::Singleton{N}, i::Int)::N where {N<:Real}\n\nReturn the i-th entry of the element of a singleton.\n\nInput\n\nS – singleton\ni – dimension\n\nOutput\n\nThe i-th entry of the element of the singleton.\n\n\n\n"
},

{
    "location": "lib/representations.html#Singletons-1",
    "page": "Common Set Representations",
    "title": "Singletons",
    "category": "section",
    "text": "Singleton\ndim(::Singleton{Float64})\nσ(::AbstractVector{Float64}, ::Singleton{Float64})\n∈(::AbstractVector{Float64}, ::Singleton{Float64})\nnorm(::Singleton{Float64}, ::Real)\ndiameter(::Singleton{Float64}, ::Real)\nvertices_list(::Singleton{Float64})\nsingleton_list(::Singleton{Float64})\ncenter(::Singleton{Float64})\nradius_hyperrectangle(::Singleton{Float64})\nradius_hyperrectangle(::Singleton{Float64}, ::Int)\nan_element(::Singleton{Float64})\nelement(::Singleton{Float64})\nelement(::Singleton{Float64}, ::Int)"
},

{
    "location": "lib/representations.html#LazySets.ZeroSet",
    "page": "Common Set Representations",
    "title": "LazySets.ZeroSet",
    "category": "Type",
    "text": "ZeroSet{N<:Real} <: AbstractSingleton{N}\n\nType that represents the zero set, i.e., the set that only contains the origin.\n\nFields\n\ndim – the ambient dimension of this zero set\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\ndim(Z::ZeroSet)::Int\n\nReturn the ambient dimension of this zero set.\n\nInput\n\nZ – a zero set, i.e., a set that only contains the origin\n\nOutput\n\nThe ambient dimension of the zero set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}\n )::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\nσ(d::AbstractVector{N}, S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the support vector of a set with a single value.\n\nInput\n\nd – direction\nS – set with a single value\n\nOutput\n\nThe support vector, which is the set\'s vector itself, irrespective of the given direction.\n\n\n\nσ(d::AbstractVector{N}, Z::ZeroSet)::Vector{N} where {N<:Real}\n\nReturn the support vector of a zero set.\n\nInput\n\nZ – a zero set, i.e., a set that only contains the origin\n\nOutput\n\nThe returned value is the origin since it is the only point that belongs to this set.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, H::AbstractHyperrectangle{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a hyperrectangular set.\n\nInput\n\nx – point/vector\nH – hyperrectangular set\n\nOutput\n\ntrue iff x  H.\n\nAlgorithm\n\nLet H be an n-dimensional hyperrectangular set, c_i and r_i be the box\'s center and radius and x_i be the vector x in dimension i, respectively. Then x  H iff c_i - x_i  r_i for all i=1n.\n\n\n\n∈(x::AbstractVector{N}, S::AbstractSingleton{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a set with a single value.\n\nInput\n\nx – point/vector\nS – set with a single value\n\nOutput\n\ntrue iff x  S.\n\nNotes\n\nThis implementation performs an exact comparison, which may be insufficient with floating point computations.\n\n\n\n∈(x::AbstractVector{N}, Z::ZeroSet{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a zero set.\n\nInput\n\nx – point/vector\nZ – zero set\n\nOutput\n\ntrue iff x  Z.\n\nExamples\n\njulia> Z = ZeroSet(2);\n\njulia> ∈([1.0, 0.0], Z)\nfalse\njulia> ∈([0.0, 0.0], Z)\ntrue\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.LinAlg.norm-Tuple{LazySets.ZeroSet{Float64},Real}",
    "page": "Common Set Representations",
    "title": "Base.LinAlg.norm",
    "category": "Method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\nnorm(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the norm of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\nNotes\n\nThe norm of a hyperrectangular set is defined as the norm of the enclosing ball, of the given p-norm, of minimal volume that is centered in the origin.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.diameter-Tuple{LazySets.ZeroSet{Float64},Real}",
    "page": "Common Set Representations",
    "title": "LazySets.diameter",
    "category": "Method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\ndiameter(H::AbstractHyperrectangle, [p]::Real=Inf)::Real\n\nReturn the diameter of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\nNotes\n\nThe diameter is defined as the maximum distance in the given p-norm between any two elements of the set. Equivalently, it is the diameter of the enclosing ball of the given p-norm of minimal volume with the same center.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(H::AbstractHyperrectangle{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a hyperrectangular set.\n\nInput\n\nH – hyperrectangular set\n\nOutput\n\nA list of vertices.\n\nNotes\n\nFor high dimensions, it is preferable to develop a vertex_iterator approach.\n\n\n\nvertices_list(S::AbstractSingleton{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the list of vertices of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nA list containing only a single vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the center of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe only element of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn the box radius of a set with a single value in every dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe zero vector.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.radius_hyperrectangle-Tuple{LazySets.ZeroSet{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.radius_hyperrectangle",
    "category": "Method",
    "text": "radius_hyperrectangle(S::AbstractSingleton{N}, i::Int)::N where {N<:Real}\n\nReturn the box radius of a set with a single value in a given dimension.\n\nInput\n\nS – set with a single value\n\nOutput\n\nZero.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\nan_element(S::AbstractSingleton{N})::Vector{N} where {N<:Real}\n\nReturn some element of a set with a single value.\n\nInput\n\nS – set with a single value\n\nOutput\n\nThe only element in the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{LazySets.ZeroSet{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "Method",
    "text": "element(S::ZeroSet{N})::Vector{N} where {N<:Real}\n\nReturn the element of a zero set.\n\nInput\n\nS – zero set\n\nOutput\n\nThe element of the zero set, i.e., a zero vector.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.element-Tuple{LazySets.ZeroSet{Float64},Int64}",
    "page": "Common Set Representations",
    "title": "LazySets.element",
    "category": "Method",
    "text": "element(S::ZeroSet{N}, ::Int)::N where {N<:Real}\n\nReturn the i-th entry of the element of a zero set.\n\nInput\n\nS – zero set\ni – dimension\n\nOutput\n\nThe i-th entry of the element of the zero set, i.e., 0.\n\n\n\n"
},

{
    "location": "lib/representations.html#ZeroSet-1",
    "page": "Common Set Representations",
    "title": "ZeroSet",
    "category": "section",
    "text": "ZeroSet\ndim(::ZeroSet{Float64})\nσ(::AbstractVector{Float64}, ::ZeroSet{Float64})\n∈(::AbstractVector{Float64}, ::ZeroSet{Float64})\nnorm(::ZeroSet{Float64}, ::Real)\ndiameter(::ZeroSet{Float64}, ::Real)\nvertices_list(::ZeroSet{Float64})\nsingleton_list(::ZeroSet{Float64})\ncenter(::ZeroSet{Float64})\nradius_hyperrectangle(::ZeroSet{Float64})\nradius_hyperrectangle(::ZeroSet{Float64}, ::Int)\nan_element(::ZeroSet{Float64})\nelement(::ZeroSet{Float64})\nelement(::ZeroSet{Float64}, ::Int)"
},

{
    "location": "lib/representations.html#LazySets.Zonotope",
    "page": "Common Set Representations",
    "title": "LazySets.Zonotope",
    "category": "Type",
    "text": "Zonotope{N<:Real} <: AbstractPointSymmetricPolytope{N}\n\nType that represents a zonotope.\n\nFields\n\ncenter     – center of the zonotope\ngenerators – matrix; each column is a generator of the zonotope\n\nNotes\n\nMathematically, a zonotope is defined as the set\n\nZ = left c + _i=1^p _i g_i _i in -1 1  i = 1 p right\n\nwhere c in mathbbR^n is its center and g_i_i=1^p, g_i in mathbbR^n, is the set of generators. This characterization defines a zonotope as the finite Minkowski sum of line elements. Zonotopes can be equivalently described as the image of a unit infinity-norm ball in mathbbR^n by an affine transformation.\n\nZonotope(center::AbstractVector{N},           generators::AbstractMatrix{N}) where {N<:Real}\nZonotope(center::AbstractVector{N},           generators_list::AbstractVector{T}          ) where {N<:Real, T<:AbstractVector{N}}\n\nExamples\n\nA two-dimensional zonotope with given center and set of generators:\n\njulia> Z = Zonotope([1.0, 0.0], 0.1*eye(2))\nLazySets.Zonotope{Float64}([1.0, 0.0], [0.1 0.0; 0.0 0.1])\njulia> dim(Z)\n2\n\nCompute its vertices:\n\njulia> vertices_list(Z)\n4-element Array{Array{Float64,1},1}:\n [0.9, -0.1]\n [1.1, -0.1]\n [1.1, 0.1]\n [0.9, 0.1]\n\nEvaluate the support vector in a given direction:\n\njulia> σ([1., 1.], Z)\n2-element Array{Float64,1}:\n 1.1\n 0.1\n\nAlternative constructor: A zonotope in two dimensions with three generators:\n\njulia> Z = Zonotope(ones(2), [[1., 0.], [0., 1.], [1., 1.]])\nLazySets.Zonotope{Float64}([1.0, 1.0], [1.0 0.0 1.0; 0.0 1.0 1.0])\njulia> Z.generators\n2×3 Array{Float64,2}:\n 1.0  0.0  1.0\n 0.0  1.0  1.0\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.dim-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, Z::Zonotope)::AbstractVector{<:Real}\n\nReturn the support vector of a zonotope in a given direction.\n\nInput\n\nd – direction\nZ – zonotope\n\nOutput\n\nSupport vector in the given direction. If the direction has norm zero, the vertex with _i = 1    i = 1 p is returned.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, Z::Zonotope{N};\n  solver=GLPKSolverLP(method=:Simplex))::Bool where {N<:Real}\n\nCheck whether a given point is contained in a zonotope.\n\nInput\n\nx      – point/vector\nZ      – zonotope\nsolver – (optional, default: GLPKSolverLP(method=:Simplex)) the backend             used to solve the linear program\n\nOutput\n\ntrue iff x  Z.\n\nExamples\n\njulia> Z = Zonotope([1.0, 0.0], 0.1*eye(2));\n\njulia> ∈([1.0, 0.2], Z)\nfalse\njulia> ∈([1.0, 0.1], Z)\ntrue\n\nAlgorithm\n\nThe element membership problem is computed by stating and solving the following linear program with the simplex method. Let p and n be the number of generators and ambient dimension respectively. We consider the minimization of x_0 in the p+1-dimensional space of elements (x_0 _1  _p) constrained to 0  x_0  , _i  -1 1 for all i = 1  p, and such that x-c = G holds. If a feasible solution exists, the optimal value x_0 = 0 is achieved.\n\nNotes\n\nThis function is parametric in the number type N. For exact arithmetic use an appropriate backend, e.g. solver=GLPKSolverLP(method=:Exact).\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.an_element-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.center-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.center",
    "category": "Method",
    "text": "center(Z::Zonotope{N})::Vector{N} where {N<:Real}\n\nReturn the center of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nThe center of the zonotope.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.vertices_list-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.vertices_list",
    "category": "Method",
    "text": "vertices_list(Z::Zonotope{N})::Vector{Vector{N}} where {N<:Real}\n\nReturn the vertices of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nList of vertices.\n\nNotes\n\nThis implementation computes a convex hull.\n\nFor high dimensions, it would be preferable to develop a vertex_iterator approach.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.singleton_list-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.singleton_list",
    "category": "Method",
    "text": "singleton_list(P::AbstractPolytope{N})::Vector{Singleton{N}} where {N<:Real}\n\nReturn the vertices of a polytopic as a list of singletons.\n\nInput\n\nP – a polytopic set\n\nOutput\n\nList containing a singleton for each vertex.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.order-Tuple{LazySets.Zonotope{Float64}}",
    "page": "Common Set Representations",
    "title": "LazySets.order",
    "category": "Method",
    "text": "order(Z::Zonotope)::Rational\n\nReturn the order of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nA rational number representing the order of the zonotope.\n\nNotes\n\nThe order of a zonotope is defined as the quotient of its number of generators and its dimension.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.minkowski_sum-Tuple{LazySets.Zonotope,LazySets.Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.minkowski_sum",
    "category": "Method",
    "text": "minkowski_sum(Z1::Zonotope, Z2::Zonotope)\n\nConcrete Minkowski sum of a pair of zonotopes.\n\nInput\n\nZ1 – one zonotope\nZ2 – another zonotope\n\nOutput\n\nThe zonotope obtained by summing the centers and concatenating the generators of Z_1 and Z_2.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.linear_map-Tuple{AbstractArray{T,2} where T,LazySets.Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.linear_map",
    "category": "Method",
    "text": "linear_map(M::AbstractMatrix, Z::Zonotope)\n\nConcrete linear map of a zonotopes.\n\nInput\n\nM – matrix\nZ – zonotope\n\nOutput\n\nThe zonotope obtained by applying the linear map to the center and generators of Z.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.scale-Tuple{Real,LazySets.Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.scale",
    "category": "Method",
    "text": "scale(α::Real, Z::Zonotope)\n\nConcrete scaling of a zonotope.\n\nInput\n\nα – scalar\nZ – zonotope\n\nOutput\n\nThe zonotope obtained by applying the numerical scale to the center and generators of Z.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.ngens-Tuple{LazySets.Zonotope}",
    "page": "Common Set Representations",
    "title": "LazySets.ngens",
    "category": "Method",
    "text": "ngens(Z::Zonotope)::Int\n\nReturn the number of generators of a zonotope.\n\nInput\n\nZ – zonotope\n\nOutput\n\nInteger representing the number of generators.\n\n\n\n"
},

{
    "location": "lib/representations.html#LazySets.reduce_order-Tuple{LazySets.Zonotope{Float64},Any}",
    "page": "Common Set Representations",
    "title": "LazySets.reduce_order",
    "category": "Method",
    "text": "reduce_order(Z::Zonotope, r)::Zonotope\n\nReduce the order of a zonotope by overapproximating with a zonotope with less generators.\n\nInput\n\nZ – zonotope\nr – desired order\n\nOutput\n\nA new zonotope with less generators, if possible.\n\nAlgorithm\n\nThis function implements the algorithm described in A. Girard\'s Reachability of Uncertain Linear Systems Using Zonotopes, HSCC. Vol. 5. 2005.\n\n\n\n"
},

{
    "location": "lib/representations.html#Base.convert-Tuple{Type{LazySets.Zonotope},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Common Set Representations",
    "title": "Base.convert",
    "category": "Method",
    "text": "convert(::Type{Zonotope}, H::AbstractHyperrectangle{N}) where {N}\n\nConverts a hyperrectangular set to a zonotope.\n\nInput\n\nZonotope\nH – hyperrectangular set\n\nOutput\n\nA zonotope.\n\n\n\n"
},

{
    "location": "lib/representations.html#Zonotopes-1",
    "page": "Common Set Representations",
    "title": "Zonotopes",
    "category": "section",
    "text": "Zonotope\ndim(::Zonotope{Float64})\nσ(::AbstractVector{Float64}, ::Zonotope{Float64})\n∈(::AbstractVector{Float64}, ::Zonotope{Float64})\nan_element(::Zonotope{Float64})\ncenter(::Zonotope{Float64})\nvertices_list(::Zonotope{Float64})\nsingleton_list(::Zonotope{Float64})\norder(::Zonotope{Float64})\nminkowski_sum(::Zonotope, ::Zonotope)\nlinear_map(::AbstractMatrix, ::Zonotope)\nscale(::Real, ::Zonotope)\nngens(::Zonotope)\nreduce_order(::Zonotope{Float64}, r)\nconvert(::Type{Zonotope}, ::AbstractHyperrectangle{Float64})"
},

{
    "location": "lib/operations.html#",
    "page": "Common Set Operations",
    "title": "Common Set Operations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/operations.html#Common-Set-Operations-1",
    "page": "Common Set Operations",
    "title": "Common Set Operations",
    "category": "section",
    "text": "This section of the manual describes the basic symbolic types describing operations between sets.Pages = [\"operations.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/operations.html#Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "Cartesian Product",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.CartesianProduct",
    "page": "Common Set Operations",
    "title": "LazySets.CartesianProduct",
    "category": "Type",
    "text": "CartesianProduct{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents a Cartesian product of two convex sets.\n\nFields\n\nX – first convex set\nY – second convex set\n\nNotes\n\nThe Cartesian product of three elements is obtained recursively. See also CartesianProductArray for an implementation of a Cartesian product of many sets without recursion, instead using an array.\n\nThe EmptySet is the absorbing element for CartesianProduct.\n\nConstructors:\n\nCartesianProduct{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}}(X1::S1, X2::S2) – default constructor\nCartesianProduct(Xarr::Vector{S}) where {S<:LazySet} – constructor from an array of convex sets\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{LazySets.LazySet{Float64},LazySets.LazySet{Float64}}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "Method",
    "text": "    *(X::LazySet, Y::LazySet)\n\nReturn the Cartesian product of two convex sets.\n\nInput\n\nX – convex set\nY – convex set\n\nOutput\n\nThe Cartesian product of the two convex sets.\n\n\n\n    *(a::N, X::LazySet) where {N}\n\nReturn a linear map of a convex set by a scalar value.\n\nInput\n\na – scalar\nX – convex set\n\nOutput\n\nThe linear map of the convex set.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.CartesianProduct{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(cp::CartesianProduct)::Int\n\nReturn the dimension of a Cartesian product.\n\nInput\n\ncp – Cartesian product\n\nOutput\n\nThe ambient dimension of the Cartesian product.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.CartesianProduct{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, cp::CartesianProduct)::AbstractVector{<:Real}\n\nReturn the support vector of a Cartesian product.\n\nInput\n\nd  – direction\ncp – Cartesian product\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the product sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.CartesianProduct{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{<:Real}, cp::CartesianProduct)::Bool\n\nCheck whether a given point is contained in a Cartesian product set.\n\nInput\n\nx  – point/vector\ncp – Cartesian product\n\nOutput\n\ntrue iff x  cp.\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "Binary Cartesian Product",
    "category": "section",
    "text": "CartesianProduct\nBase.:*(::LazySet{Float64}, ::LazySet{Float64})\ndim(::CartesianProduct{Float64, LazySet{Float64}, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::CartesianProduct{Float64, LazySet{Float64}, LazySet{Float64}})\n∈(::AbstractVector{Float64}, ::CartesianProduct{Float64, LazySet{Float64}, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#LazySets.CartesianProductArray",
    "page": "Common Set Operations",
    "title": "LazySets.CartesianProductArray",
    "category": "Type",
    "text": "CartesianProductArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the Cartesian product of a finite number of convex sets.\n\nFields\n\narray – array of sets\n\nNotes\n\nThe EmptySet is the absorbing element for CartesianProductArray.\n\nConstructors:\n\nCartesianProductArray(array::Vector{<:LazySet}) – default constructor\nCartesianProductArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty product with optional size hint and numeric type\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{LazySets.CartesianProductArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "Method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.CartesianProductArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(cpa::CartesianProductArray)::Int\n\nReturn the dimension of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe ambient dimension of the Cartesian product of a finite number of convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.CartesianProductArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, cpa::CartesianProductArray{N, <:LazySet{N}}\n )::AbstractVector{N} where {N<:Real}\n\nSupport vector of a Cartesian product.\n\nInput\n\nd   – direction\ncpa – Cartesian product array\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the product sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.CartesianProductArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, cpa::CartesianProductArray{N, <:LazySet{N}}\n )::Bool  where {N<:Real}\n\nCheck whether a given point is contained in a Cartesian product of a finite number of sets.\n\nInput\n\nx   – point/vector\ncpa – Cartesian product array\n\nOutput\n\ntrue iff x  textcpa.\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Cartesian-Product-1",
    "page": "Common Set Operations",
    "title": "n-ary Cartesian Product",
    "category": "section",
    "text": "CartesianProductArray{Float64, LazySet{Float64}}\narray(::CartesianProductArray{Float64, LazySet{Float64}})\ndim(::CartesianProductArray{Float64, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::CartesianProductArray{Float64, LazySet{Float64}})\n∈(::AbstractVector{Float64}, ::CartesianProductArray{Float64, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "Convex Hull",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.ConvexHull",
    "page": "Common Set Operations",
    "title": "LazySets.ConvexHull",
    "category": "Type",
    "text": "ConvexHull{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents the convex hull of the union of two convex sets.\n\nFields\n\nX – convex set\nY – convex set\n\nNotes\n\nThe EmptySet is the neutral element for ConvexHull.\n\nExamples\n\nConvex hull of two 100-dimensional Euclidean balls:\n\njulia> b1, b2 = Ball2(zeros(100), 0.1), Ball2(4*ones(100), 0.2);\n\njulia> c = ConvexHull(b1, b2);\n\njulia> typeof(c)\nLazySets.ConvexHull{Float64,LazySets.Ball2{Float64},LazySets.Ball2{Float64}}\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.CH",
    "page": "Common Set Operations",
    "title": "LazySets.CH",
    "category": "Type",
    "text": "CH\n\nAlias for ConvexHull.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.ConvexHull{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(ch::ConvexHull)::Int\n\nReturn the dimension of a convex hull of two convex sets.\n\nInput\n\nch – convex hull of two convex sets\n\nOutput\n\nThe ambient dimension of the convex hull of two convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.ConvexHull{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, ch::ConvexHull)::AbstractVector{<:Real}\n\nReturn the support vector of a convex hull of two convex sets in a given direction.\n\nInput\n\nd  – direction\nch – convex hull of two convex sets\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "Binary Convex Hull",
    "category": "section",
    "text": "ConvexHull\nCH\ndim(::ConvexHull{Float64, LazySet{Float64}, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::ConvexHull{Float64, LazySet{Float64}, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#LazySets.ConvexHullArray",
    "page": "Common Set Operations",
    "title": "LazySets.ConvexHullArray",
    "category": "Type",
    "text": "ConvexHullArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the symbolic convex hull of a finite number of convex sets.\n\nFields\n\narray – array of sets\n\nNotes\n\nThe EmptySet is the neutral element for ConvexHullArray.\n\nConstructors:\n\nConvexHullArray(array::Vector{<:LazySet}) – default constructor\nConvexHullArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty hull with optional size hint and numeric type\n\nExamples\n\nConvex hull of 100 two-dimensional balls whose centers follows a sinusoidal:\n\njulia> b = [Ball2([2*pi*i/100, sin(2*pi*i/100)], 0.05) for i in 1:100];\n\njulia> c = ConvexHullArray(b);\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.CHArray",
    "page": "Common Set Operations",
    "title": "LazySets.CHArray",
    "category": "Type",
    "text": "CHArray\n\nAlias for ConvexHullArray.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{LazySets.ConvexHullArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "Method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.ConvexHullArray}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(cha::ConvexHullArray)::Int\n\nReturn the dimension of the convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe ambient dimension of the convex hull of a finite number of convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.ConvexHullArray}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, cha::ConvexHullArray)::AbstractVector{<:Real}\n\nReturn the support vector of a convex hull array in a given direction.\n\nInput\n\nd   – direction\ncha – convex hull array\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Convex-Hull-1",
    "page": "Common Set Operations",
    "title": "n-ary Convex Hull",
    "category": "section",
    "text": "ConvexHullArray\nCHArray\narray(::ConvexHullArray{Float64, LazySet{Float64}})\ndim(cha::ConvexHullArray)\nσ(d::AbstractVector{Float64}, cha::ConvexHullArray)"
},

{
    "location": "lib/operations.html#LazySets.convex_hull",
    "page": "Common Set Operations",
    "title": "LazySets.convex_hull",
    "category": "Function",
    "text": "convex_hull(points::Vector{S}; [algorithm]::String=\"monotone_chain\"\n           )::Vector{S} where {S<:AbstractVector{N}} where {N<:Real}\n\nCompute the convex hull of points in the plane.\n\nInput\n\npoints    – list of 2D vectors\nalgorithm – (optional, default: \"monotone_chain\") the convex hull                algorithm, valid options are:\n\"monotone_chain\"\n\"monotone_chain_sorted\"\n\nOutput\n\nThe convex hull as a list of 2D vectors with the coordinates of the points.\n\nExamples\n\nCompute the convex hull of a random set of points:\n\njulia> points = [randn(2) for i in 1:30]; # 30 random points in 2D\n\njulia> hull = convex_hull(points);\n\njulia> typeof(hull)\nArray{Array{Float64,1},1}\n\nPlot both the random points and the computed convex hull polygon:\n\njulia> using Plots;\n\njulia> plot([Tuple(pi) for pi in points], seriestype=:scatter);\n\njulia> plot!(VPolygon(hull), alpha=0.2);\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.convex_hull!",
    "page": "Common Set Operations",
    "title": "LazySets.convex_hull!",
    "category": "Function",
    "text": "convex_hull!(points::Vector{S}; [algorithm]::String=\"monotone_chain\"\n            )::Vector{S} where {S<:AbstractVector{N}} where {N<:Real}\n\nCompute the convex hull of points in the plane, in-place.\n\nInput\n\npoints    – list of 2D vectors (is modified)\nalgorithm – (optional, default: \"monotone_chain\") the convex hull                algorithm; valid options are:\n\"monotone_chain\"\n\"monotone_chain_sorted\"\n\nOutput\n\nThe convex hull as a list of 2D vectors with the coordinates of the points.\n\nNotes\n\nSee the non-modifying version convex_hull for more details.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.right_turn",
    "page": "Common Set Operations",
    "title": "LazySets.right_turn",
    "category": "Function",
    "text": "right_turn(O::AbstractVector{N}, A::AbstractVector{N}, B::AbstractVector{N}\n          )::N where {N<:Real}\n\nDetermine if the acute angle defined by the three points O, A, B in the plane is a right turn (counter-clockwise) with respect to the center O.\n\nInput\n\nO – 2D center point\nA – 2D one point\nB – 2D another point\n\nOutput\n\nScalar representing the rotation.\n\nAlgorithm\n\nThe cross product is used to determine the sense of rotation. If the result is 0, the points are collinear; if it is positive, the three points constitute a positive angle of rotation around O from A to B; otherwise they constitute a negative angle.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.monotone_chain!",
    "page": "Common Set Operations",
    "title": "LazySets.monotone_chain!",
    "category": "Function",
    "text": "monotone_chain!(points::Vector{S}; sort::Bool=true\n               )::Vector{S} where {S<:AbstractVector{N}} where {N<:Real}\n\nCompute the convex hull of points in the plane using Andrew\'s monotone chain method.\n\nInput\n\npoints – list of 2D vectors; is sorted in-place inside this function\nsort   – (optional, default: true) flag for sorting the vertices             lexicographically; sortedness is required for correctness\n\nOutput\n\nList of vectors containing the 2D coordinates of the corner points of the convex hull.\n\nNotes\n\nFor large sets of points, it is convenient to use static vectors to get maximum performance. For information on how to convert usual vectors into static vectors, see the type SVector provided by the StaticArrays package.\n\nAlgorithm\n\nThis function implements Andrew\'s monotone chain convex hull algorithm to construct the convex hull of a set of n points in the plane in O(n log n) time. For further details see Monotone chain\n\n\n\n"
},

{
    "location": "lib/operations.html#Convex-Hull-Algorithms-1",
    "page": "Common Set Operations",
    "title": "Convex Hull Algorithms",
    "category": "section",
    "text": "convex_hull\nconvex_hull!\nright_turn\nmonotone_chain!"
},

{
    "location": "lib/operations.html#LazySets.Intersection",
    "page": "Common Set Operations",
    "title": "LazySets.Intersection",
    "category": "Type",
    "text": "Intersection{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents the intersection of two convex sets.\n\nFields\n\nX – convex set\nY – convex set\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.Intersection{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(cap::Intersection)::Int\n\nReturn the dimension of an intersection of two convex sets.\n\nInput\n\ncap – intersection of two convex sets\n\nOutput\n\nThe ambient dimension of the intersection of two convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.Intersection{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, cap::Intersection)::AbstractVector{<:Real}\n\nReturn the support vector of an intersection of two convex sets in a given direction.\n\nInput\n\nd   – direction\ncap – intersection of two convex sets\n\nOutput\n\nThe support vector in the given direction.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.Intersection{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, cap::Intersection{N})::Bool where {N<:Real}\n\nCheck whether a given point is contained in a intersection of two convex sets.\n\nInput\n\nx – point/vector\ncap – intersection of two convex sets\n\nOutput\n\ntrue iff x  cap.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.isempty-Tuple{LazySets.Intersection{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "Base.isempty",
    "category": "Method",
    "text": "isempty(cap::Intersection)::Bool\n\nReturn if the intersection is empty or not.\n\nInput\n\ncap – intersection of two convex sets\n\nOutput\n\ntrue iff the intersection is empty.\n\n\n\n"
},

{
    "location": "lib/operations.html#Intersection-1",
    "page": "Common Set Operations",
    "title": "Intersection",
    "category": "section",
    "text": "Intersection\ndim(::Intersection{Float64, LazySet{Float64}, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::Intersection{Float64, LazySet{Float64}, LazySet{Float64}})\n∈(::AbstractVector{Float64}, ::Intersection{Float64, LazySet{Float64}, LazySet{Float64}})\nisempty(::Intersection{Float64, LazySet{Float64}, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "Minkowski Sum",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.MinkowskiSum",
    "page": "Common Set Operations",
    "title": "LazySets.MinkowskiSum",
    "category": "Type",
    "text": "MinkowskiSum{N<:Real, S1<:LazySet{N}, S2<:LazySet{N}} <: LazySet{N}\n\nType that represents the Minkowski sum of two convex sets.\n\nFields\n\nX – first convex set\nY – second convex set\n\nNotes\n\nThe ZeroSet is the neutral element and the EmptySet is the absorbing element for MinkowskiSum.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:+-Tuple{LazySets.LazySet{Float64},LazySets.LazySet{Float64}}",
    "page": "Common Set Operations",
    "title": "Base.:+",
    "category": "Method",
    "text": "X + Y\n\nConvenience constructor for Minkowski sum.\n\nInput\n\nX – a convex set\nY – another convex set\n\nOutput\n\nThe symbolic Minkowski sum of X and Y.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.:⊕",
    "page": "Common Set Operations",
    "title": "LazySets.:⊕",
    "category": "Function",
    "text": "⊕(X::LazySet, Y::LazySet)\n\nUnicode alias constructor oplus for the Minkowski sum operator +(X, Y).\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.MinkowskiSum{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(ms::MinkowskiSum)::Int\n\nReturn the dimension of a Minkowski sum.\n\nInput\n\nms – Minkowski sum\n\nOutput\n\nThe ambient dimension of the Minkowski sum.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.MinkowskiSum{Float64,LazySets.LazySet{Float64},LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, ms::MinkowskiSum)::AbstractVector{<:Real}\n\nReturn the support vector of a Minkowski sum.\n\nInput\n\nd  – direction\nms – Minkowski sum\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the summand sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#Binary-Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "Binary Minkowski Sum",
    "category": "section",
    "text": "MinkowskiSum\nBase.:+(::LazySet{Float64}, ::LazySet{Float64})\n⊕\ndim(::MinkowskiSum{Float64, LazySet{Float64}, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::MinkowskiSum{Float64, LazySet{Float64}, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#LazySets.MinkowskiSumArray",
    "page": "Common Set Operations",
    "title": "LazySets.MinkowskiSumArray",
    "category": "Type",
    "text": "MinkowskiSumArray{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the Minkowski sum of a finite number of convex sets.\n\nFields\n\narray – array of convex sets\n\nNotes\n\nThis type assumes that the dimensions of all elements match.\n\nThe ZeroSet is the neutral element and the EmptySet is the absorbing element for MinkowskiSumArray.\n\nConstructors:\n\nMinkowskiSumArray(array::Vector{<:LazySet}) – default constructor\nMinkowskiSumArray([n]::Int=0, [N]::Type=Float64) – constructor for an empty sum with optional size hint and numeric type\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.array-Tuple{LazySets.MinkowskiSumArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.array",
    "category": "Method",
    "text": "array(cpa::CartesianProductArray{N, S}\n     )::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Cartesian product of a finite number of convex sets.\n\nInput\n\ncpa – Cartesian product array\n\nOutput\n\nThe array of a Cartesian product of a finite number of convex sets.\n\n\n\narray(cha::ConvexHullArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a convex hull of a finite number of convex sets.\n\nInput\n\ncha – convex hull array\n\nOutput\n\nThe array of a convex hull of a finite number of convex sets.\n\n\n\narray(msa::MinkowskiSumArray{N, S})::Vector{S} where {N<:Real, S<:LazySet{N}}\n\nReturn the array of a Minkowski sum of a finite number of convex sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe array of a Minkowski sum of a finite number of convex sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.MinkowskiSumArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(msa::MinkowskiSumArray)::Int\n\nReturn the dimension of a Minkowski sum of a finite number of sets.\n\nInput\n\nmsa – Minkowski sum array\n\nOutput\n\nThe ambient dimension of the Minkowski sum of a finite number of sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.MinkowskiSumArray{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, msa::MinkowskiSumArray)::Vector{<:Real}\n\nReturn the support vector of a Minkowski sum of a finite number of sets in a given direction.\n\nInput\n\nd   – direction\nmsa – Minkowski sum array\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the summand sets.\n\n\n\n"
},

{
    "location": "lib/operations.html#n-ary-Minkowski-Sum-1",
    "page": "Common Set Operations",
    "title": "n-ary Minkowski Sum",
    "category": "section",
    "text": "MinkowskiSumArray\narray(::MinkowskiSumArray{Float64, LazySet{Float64}})\ndim(::MinkowskiSumArray{Float64, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::MinkowskiSumArray{Float64, LazySet{Float64}})"
},

{
    "location": "lib/operations.html#Maps-1",
    "page": "Common Set Operations",
    "title": "Maps",
    "category": "section",
    "text": ""
},

{
    "location": "lib/operations.html#LazySets.LinearMap",
    "page": "Common Set Operations",
    "title": "LazySets.LinearMap",
    "category": "Type",
    "text": "LinearMap{NM, N} <: LazySet{N}\n\nType that represents a linear transformation MS of a convex set S.\n\nFields\n\nM – matrix/linear map\nX – convex set\n\nNotes\n\nThis type is parametric in the elements of the linear map, NM, and independently on the type of elements of the target set (N). Typically NM = N but it is not necessarily always the case e.g. if NM is an interval that holds numbers of type N, where N is a floating point number type such as Float64.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.LinearMap{Float64,Float64}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(lm::LinearMap)::Int\n\nReturn the dimension of a linear map.\n\nInput\n\nlm – linear map\n\nOutput\n\nThe ambient dimension of the linear map.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.LinearMap{Float64,Float64}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{<:Real}, lm::LinearMap)::AbstractVector{<:Real}\n\nReturn the support vector of the linear map.\n\nInput\n\nd  – direction\nlm – linear map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf L = MS, where M is a matrix and S is a convex set, it follows that (d L) = M(M^T d S) for any direction d.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{AbstractArray{T,2} where T,LazySets.LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "Method",
    "text": "    *(M::AbstractMatrix, X::LazySet)\n\nReturn the linear map of a convex set.\n\nInput\n\nM – matrix/linear map\nX – convex set\n\nOutput\n\nIf the matrix is null, a ZeroSet is returned; otherwise a lazy linear map.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{Float64,LazySets.LazySet}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "Method",
    "text": "    *(a::N, X::LazySet) where {N}\n\nReturn a linear map of a convex set by a scalar value.\n\nInput\n\na – scalar\nX – convex set\n\nOutput\n\nThe linear map of the convex set.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.LinearMap{Float64,Float64}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, lm::LinearMap{NM, N})::Bool where {NM, N<:Real}\n\nCheck whether a given point is contained in a linear map of a convex set.\n\nInput\n\nx  – point/vector\nlm – linear map of a convex set\n\nOutput\n\ntrue iff x  lm.\n\nAlgorithm\n\nNote that x  MS iff M^-1x  S. This implementation does not explicitly invert the matrix, which is why it also works for non-square matrices.\n\nExamples\n\njulia> lm = LinearMap([2.0 0.0; 0.0 1.0], BallInf([1., 1.], 1.));\n\njulia> ∈([5.0, 1.0], lm)\nfalse\njulia> ∈([3.0, 1.0], lm)\ntrue\n\nAn example with non-square matrix:\n\njulia> B = BallInf(zeros(4), 1.);\n\njulia> M = [1. 0 0 0; 0 1 0 0]/2;\n\njulia> ∈([0.5, 0.5], M*B)\ntrue\n\n\n\n"
},

{
    "location": "lib/operations.html#Linear-Map-1",
    "page": "Common Set Operations",
    "title": "Linear Map",
    "category": "section",
    "text": "LinearMap\ndim(::LinearMap{Float64, Float64})\nσ(::AbstractVector{Float64}, ::LinearMap{Float64, Float64})\n*(::AbstractMatrix, ::LazySet)\n*(::Float64, ::LazySet)\n∈(x::AbstractVector{Float64}, ::LinearMap{Float64, Float64})"
},

{
    "location": "lib/operations.html#LazySets.ExponentialMap",
    "page": "Common Set Operations",
    "title": "LazySets.ExponentialMap",
    "category": "Type",
    "text": "ExponentialMap{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the action of an exponential map on a convex set.\n\nFields\n\nspmexp – sparse matrix exponential\nX      – convex set\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.ExponentialMap{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(em::ExponentialMap)::Int\n\nReturn the dimension of an exponential map.\n\nInput\n\nem – an ExponentialMap\n\nOutput\n\nThe ambient dimension of the exponential map.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.ExponentialMap{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, em::ExponentialMap)::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of the exponential map.\n\nInput\n\nd  – direction\nem – exponential map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf E = exp(M)S, where M is a matrix and S is a convex set, it follows that (d E) = exp(M)(exp(M)^T d S) for any direction d.\n\nWe allow sparse direction vectors, but will convert them to dense vectors to be able to use expmv.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:∈-Tuple{AbstractArray{Float64,1},LazySets.ExponentialMap{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "Base.:∈",
    "category": "Method",
    "text": "∈(x::AbstractVector{N}, em::ExponentialMap{<:LazySet{N}})::Bool where {N<:Real}\n\nCheck whether a given point is contained in an exponential map of a convex set.\n\nInput\n\nx  – point/vector\nem – exponential map of a convex set\n\nOutput\n\ntrue iff x  em.\n\nAlgorithm\n\nThis implementation exploits that x  exp(M)S iff exp(-M)x  S. This follows from exp(-M)exp(M) = I for any M.\n\nExamples\n\njulia> em = ExponentialMap(SparseMatrixExp(SparseMatrixCSC([2.0 0.0; 0.0 1.0])),\n                           BallInf([1., 1.], 1.));\n\njulia> ∈([5.0, 1.0], em)\nfalse\njulia> ∈([1.0, 1.0], em)\ntrue\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.ExponentialProjectionMap",
    "page": "Common Set Operations",
    "title": "LazySets.ExponentialProjectionMap",
    "category": "Type",
    "text": "ExponentialProjectionMap{N<:Real, S<:LazySet{N}} <: LazySet{N}\n\nType that represents the application of a projection of a sparse matrix exponential to a convex set.\n\nFields\n\nspmexp – projection of a sparse matrix exponential\nX      – convex set\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.ExponentialProjectionMap{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(eprojmap::ExponentialProjectionMap)::Int\n\nReturn the dimension of a projection of an exponential map.\n\nInput\n\neprojmap – projection of an exponential map\n\nOutput\n\nThe ambient dimension of the projection of an exponential map.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.ExponentialProjectionMap{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N},\n  eprojmap::ExponentialProjectionMap)::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a projection of an exponential map.\n\nInput\n\nd        – direction\neprojmap – projection of an exponential map\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the result depends on the wrapped set.\n\nNotes\n\nIf S = (LMR)X, where L and R are matrices, M is a matrix exponential, and X is a set, it follows that (d S) = LMR(R^TM^TL^Td X) for any direction d.\n\nWe allow sparse direction vectors, but will convert them to dense vectors to be able to use expmv.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.SparseMatrixExp",
    "page": "Common Set Operations",
    "title": "LazySets.SparseMatrixExp",
    "category": "Type",
    "text": "SparseMatrixExp{N}\n\nType that represents the matrix exponential, exp(M), of a sparse matrix.\n\nFields\n\nM – sparse matrix\n\nNotes\n\nThis type is provided for use with very large and very sparse matrices. The evaluation of the exponential matrix action over vectors relies on the Expokit package.\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{LazySets.SparseMatrixExp{Float64},LazySets.LazySet{Float64}}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "Method",
    "text": "    *(spmexp::SparseMatrixExp, X::LazySet)::ExponentialMap\n\nReturn the exponential map of a convex set from a sparse matrix exponential.\n\nInput\n\nspmexp – sparse matrix exponential\nX      – convex set\n\nOutput\n\nThe exponential map of the convex set.\n\n\n\n    *(a::N, X::LazySet) where {N}\n\nReturn a linear map of a convex set by a scalar value.\n\nInput\n\na – scalar\nX – convex set\n\nOutput\n\nThe linear map of the convex set.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.ProjectionSparseMatrixExp",
    "page": "Common Set Operations",
    "title": "LazySets.ProjectionSparseMatrixExp",
    "category": "Type",
    "text": "ProjectionSparseMatrixExp{N<:Real}\n\nType that represents the projection of a sparse matrix exponential, i.e., Lexp(M)R for a given sparse matrix M.\n\nFields\n\nL – left multiplication matrix\nE – sparse matrix exponential\nR – right multiplication matrix\n\n\n\n"
},

{
    "location": "lib/operations.html#Base.:*-Tuple{LazySets.ProjectionSparseMatrixExp{Float64},LazySets.LazySet{Float64}}",
    "page": "Common Set Operations",
    "title": "Base.:*",
    "category": "Method",
    "text": "    *(projspmexp::ProjectionSparseMatrixExp,\n      X::LazySet)::ExponentialProjectionMap\n\nReturn the application of a projection of a sparse matrix exponential to a convex set.\n\nInput\n\nprojspmexp – projection of a sparse matrix exponential\nX          – convex set\n\nOutput\n\nThe application of the projection of a sparse matrix exponential to the convex set.\n\n\n\n    *(a::N, X::LazySet) where {N}\n\nReturn a linear map of a convex set by a scalar value.\n\nInput\n\na – scalar\nX – convex set\n\nOutput\n\nThe linear map of the convex set.\n\n\n\n"
},

{
    "location": "lib/operations.html#Exponential-Map-1",
    "page": "Common Set Operations",
    "title": "Exponential Map",
    "category": "section",
    "text": "ExponentialMap\ndim(::ExponentialMap{Float64, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::ExponentialMap{Float64, LazySet{Float64}})\n∈(::AbstractVector{Float64}, ::ExponentialMap{Float64, LazySet{Float64}})ExponentialProjectionMap\ndim(::ExponentialProjectionMap{Float64, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::ExponentialProjectionMap{Float64, LazySet{Float64}})SparseMatrixExp\n*(::SparseMatrixExp{Float64}, ::LazySet{Float64})ProjectionSparseMatrixExp\n*(::ProjectionSparseMatrixExp{Float64}, ::LazySet{Float64})"
},

{
    "location": "lib/operations.html#LazySets.SymmetricIntervalHull",
    "page": "Common Set Operations",
    "title": "LazySets.SymmetricIntervalHull",
    "category": "Type",
    "text": "SymmetricIntervalHull{N<:Real, S<:LazySet{N}} <: AbstractHyperrectangle{N}\n\nType that represents the symmetric interval hull of a convex set.\n\nFields\n\nX     – convex set\ncache – partial storage of already computed bounds, organized as mapping   from dimension to tuples (bound, valid), where valid is a flag   indicating if the bound entry has been computed\n\nNotes\n\nThe symmetric interval hull can be computed with 2n support vector queries of unit vectors, where n is the dimension of the wrapped set (i.e., two queries per dimension). When asking for the support vector for a direction d, one needs 2k such queries, where k is the number of non-zero entries in d.\n\nHowever, if one asks for many support vectors in a loop, the number of computations may exceed 2n. To be most efficient in such cases, this type stores the intermediately computed bounds in the cache field.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.dim-Tuple{LazySets.SymmetricIntervalHull{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.dim",
    "category": "Method",
    "text": "dim(P::AbstractPointSymmetricPolytope)::Int\n\nReturn the ambient dimension of a point symmetric set.\n\nInput\n\nP – set\n\nOutput\n\nThe ambient dimension of the set.\n\n\n\ndim(sih::SymmetricIntervalHull)::Int\n\nReturn the dimension of a symmetric interval hull of a convex set.\n\nInput\n\nsih – symmetric interval hull of a convex set\n\nOutput\n\nThe ambient dimension of the symmetric interval hull of a convex set.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.σ-Tuple{AbstractArray{Float64,1},LazySets.SymmetricIntervalHull{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.σ",
    "category": "Method",
    "text": "σ(d::AbstractVector{N}, H::AbstractHyperrectangle{N}\n )::AbstractVector{N} where {N<:Real}\n\nReturn the support vector of a hyperrectangular set in a given direction.\n\nInput\n\nd – direction\nH – hyperrectangular set\n\nOutput\n\nThe support vector in the given direction. If the direction has norm zero, the vertex with biggest values is returned.\n\n\n\nσ(d::AbstractVector{N}, sih::SymmetricIntervalHull\n )::AbstractVector{<:Real} where {N<:Real}\n\nReturn the support vector of a symmetric interval hull of a convex set in a given direction.\n\nInput\n\nd   – direction\nsih – symmetric interval hull of a convex set\n\nOutput\n\nThe support vector of the symmetric interval hull of a convex set in the given direction. If the direction has norm zero, the origin is returned.\n\nAlgorithm\n\nFor each non-zero entry in d we need to either look up the bound (if it has been computed before) or compute it, in which case we store it for future queries. One such computation just asks for the support vector of the underlying set for both the positive and negative unit vector in the respective dimension.\n\n\n\n"
},

{
    "location": "lib/operations.html#LazySets.an_element-Tuple{LazySets.SymmetricIntervalHull{Float64,LazySets.LazySet{Float64}}}",
    "page": "Common Set Operations",
    "title": "LazySets.an_element",
    "category": "Method",
    "text": "an_element(S::LazySet{N})::AbstractVector{N} where {N<:Real}\n\nReturn some element of a convex set.\n\nInput\n\nS – convex set\n\nOutput\n\nAn element of a convex set.\n\n\n\nan_element(P::AbstractPointSymmetricPolytope{N})::Vector{N} where {N<:Real}\n\nReturn some element of a point symmetric polytope.\n\nInput\n\nP – point symmetric polytope\n\nOutput\n\nThe center of the point symmetric polytope.\n\n\n\n"
},

{
    "location": "lib/operations.html#Symmetric-Interval-Hull-1",
    "page": "Common Set Operations",
    "title": "Symmetric Interval Hull",
    "category": "section",
    "text": "SymmetricIntervalHull\ndim(::SymmetricIntervalHull{Float64, LazySet{Float64}})\nσ(::AbstractVector{Float64}, ::SymmetricIntervalHull{Float64, LazySet{Float64}})\nan_element(::SymmetricIntervalHull{Float64, LazySet{Float64}})"
},

{
    "location": "lib/conversion.html#",
    "page": "Conversion between set representations",
    "title": "Conversion between set representations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/conversion.html#Base.convert",
    "page": "Conversion between set representations",
    "title": "Base.convert",
    "category": "Function",
    "text": "convert(::Type{HPOLYGON1}, P::HPOLYGON2) where\n    {HPOLYGON1<:Union{HPolygon, HPolygonOpt}, HPOLYGON2<:AbstractHPolygon}\n\nConvert between polygon types in H-representation.\n\nInput\n\ntype – target type\nP    – source polygon\n\nOutput\n\nThe polygon represented as the target type.\n\nNotes\n\nWe need the Union type for HPOLYGON1 because the target type must be concrete.\n\n\n\nconvert(::Type{HPolytope}, P::AbstractHPolygon)\n\nConvert from polygon in H-representation to polytope in H-representation.\n\nInput\n\ntype – target type\nP    – source polygon\n\nOutput\n\nThe polygon represented as 2D polytope.\n\n\n\nconvert(::Type{HPOLYGON}, P::HPolytope) where {HPOLYGON<:AbstractHPolygon}\n\nConvert from 2D polytope in H-representation to polygon in H-representation.\n\nInput\n\ntype – target type\nP    – source polytope (must be 2D)\n\nOutput\n\nThe 2D polytope represented as polygon.\n\n\n\nconvert(::Type{Zonotope}, H::AbstractHyperrectangle{N}) where {N}\n\nConverts a hyperrectangular set to a zonotope.\n\nInput\n\nZonotope\nH – hyperrectangular set\n\nOutput\n\nA zonotope.\n\n\n\n"
},

{
    "location": "lib/conversion.html#Conversion-between-set-representations-1",
    "page": "Conversion between set representations",
    "title": "Conversion between set representations",
    "category": "section",
    "text": "This section of the manual lists the conversion functions between set representations.Pages = [\"conversion.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nendconvert"
},

{
    "location": "lib/binary_functions.html#",
    "page": "Binary Functions on Sets",
    "title": "Binary Functions on Sets",
    "category": "page",
    "text": ""
},

{
    "location": "lib/binary_functions.html#Binary-Functions-on-Sets-1",
    "page": "Binary Functions on Sets",
    "title": "Binary Functions on Sets",
    "category": "section",
    "text": "This section of the manual describes the binary functions for set types.Pages = [\"binary_functions.md\"]\nDepth = 3CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/binary_functions.html#Base.:⊆",
    "page": "Binary Functions on Sets",
    "title": "Base.:⊆",
    "category": "Function",
    "text": "⊆\n\nAlias for is_subset.\n\nNotes\n\n⊆ is a Julia-internal function which is defined for every type combination, but crashes with a cryptic error message if it is not implemented:\n\n`MethodError: no method matching start(::FIRST_SET_TYPE)`\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.LazySet{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractPolytope{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\nis_subset(P::AbstractPolytope{N},\n          H::AbstractHyperrectangle,\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\nis_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractHyperrectangle{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\nis_subset(P::AbstractPolytope{N},\n          H::AbstractHyperrectangle,\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\nis_subset(H1::AbstractHyperrectangle{N},\n          H2::AbstractHyperrectangle{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given hyperrectangle is contained in another hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nH1 – inner hyperrectangle\nH2 – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2\nIf witness option is activated:\n(true, []) iff H1  H2\n(false, v) iff H1 notsubseteq H2 and v  H1 setminus H2\n\nAlgorithm\n\nH1  H2 iff c_1 + r_1  c_2 + r_2  c_1 - r_1  c_2 - r_2 iff r_1 - r_2  c_1 - c_2  -(r_1 - r_2), where  is taken component-wise.\n\n\n\nis_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractPolytope{Float64},LazySets.LazySet{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractSingleton{Float64},LazySets.LazySet{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\nis_subset(S::AbstractSingleton{N}, set::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nS   – inner set with a single value\nset – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  textset\nIf witness option is activated:\n(true, []) iff S  textset\n(false, v) iff S notsubseteq textset and v  S setminus textset\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractSingleton{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\nis_subset(P::AbstractPolytope{N},\n          H::AbstractHyperrectangle,\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\nis_subset(H1::AbstractHyperrectangle{N},\n          H2::AbstractHyperrectangle{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given hyperrectangle is contained in another hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nH1 – inner hyperrectangle\nH2 – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2\nIf witness option is activated:\n(true, []) iff H1  H2\n(false, v) iff H1 notsubseteq H2 and v  H1 setminus H2\n\nAlgorithm\n\nH1  H2 iff c_1 + r_1  c_2 + r_2  c_1 - r_1  c_2 - r_2 iff r_1 - r_2  c_1 - c_2  -(r_1 - r_2), where  is taken component-wise.\n\n\n\nis_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\nis_subset(S::AbstractSingleton{N}, set::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nS   – inner set with a single value\nset – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  textset\nIf witness option is activated:\n(true, []) iff S  textset\n(false, v) iff S notsubseteq textset and v  S setminus textset\n\n\n\nis_subset(S::AbstractSingleton{N},\n          H::AbstractHyperrectangle{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner set with a single value\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.AbstractSingleton{Float64},LazySets.AbstractSingleton{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\nis_subset(P::AbstractPolytope{N},\n          H::AbstractHyperrectangle,\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  H\nIf witness option is activated:\n(true, []) iff P  H\n(false, v) iff P notsubseteq H and v  P setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\nAlgorithm\n\nSince H is convex, P  H iff v_i  H for all vertices v_i of P.\n\n\n\nis_subset(H1::AbstractHyperrectangle{N},\n          H2::AbstractHyperrectangle{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given hyperrectangle is contained in another hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nH1 – inner hyperrectangle\nH2 – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2\nIf witness option is activated:\n(true, []) iff H1  H2\n(false, v) iff H1 notsubseteq H2 and v  H1 setminus H2\n\nAlgorithm\n\nH1  H2 iff c_1 + r_1  c_2 + r_2  c_1 - r_1  c_2 - r_2 iff r_1 - r_2  c_1 - c_2  -(r_1 - r_2), where  is taken component-wise.\n\n\n\nis_subset(P::AbstractPolytope{N}, S::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a polytope is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nP – inner polytope\nS – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff P  S\nIf witness option is activated:\n(true, []) iff P  S\n(false, v) iff P notsubseteq S and v  P setminus S\n\nAlgorithm\n\nSince S is convex, P  S iff v_i  S for all vertices v_i of P.\n\n\n\nis_subset(S::AbstractSingleton{N}, set::LazySet{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a convex set, and if not, optionally compute a witness.\n\nInput\n\nS   – inner set with a single value\nset – outer convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  textset\nIf witness option is activated:\n(true, []) iff S  textset\n(false, v) iff S notsubseteq textset and v  S setminus textset\n\n\n\nis_subset(S::AbstractSingleton{N},\n          H::AbstractHyperrectangle{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner set with a single value\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nNotes\n\nThis copy-pasted method just exists to avoid method ambiguities.\n\n\n\nis_subset(S1::AbstractSingleton{N},\n          S2::AbstractSingleton{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a given set with a single value is contained in another set with a single value, and if not, optionally compute a witness.\n\nInput\n\nS1 – inner set with a single value\nS2 – outer set with a single value\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S1  S2 iff S1 == S2\nIf witness option is activated:\n(true, []) iff S1  S2\n(false, v) iff S1 notsubseteq S2 and v  S1 setminus S2\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.Ball2{Float64},LazySets.Ball2{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(B1::Ball2{N}, B2::Ball2{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a ball in the 2-norm is contained in another ball in the 2-norm, and if not, optionally compute a witness.\n\nInput\n\nB1 – inner ball in the 2-norm\nB2 – outer ball in the 2-norm\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B1  B2\nIf witness option is activated:\n(true, []) iff B1  B2\n(false, v) iff B1 notsubseteq B2 and v  B1 setminus B2\n\nAlgorithm\n\nB1  B2 iff  c_1 - c_2 _2 + r_1  r_2\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_subset-Tuple{LazySets.Ball2{Float64},LazySets.AbstractSingleton{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_subset",
    "category": "Method",
    "text": "is_subset(S::LazySet{N}, H::AbstractHyperrectangle{N}, [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a convex set is contained in a hyperrectangle, and if not, optionally compute a witness.\n\nInput\n\nS – inner convex set\nH – outer hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  H\nIf witness option is activated:\n(true, []) iff S  H\n(false, v) iff S notsubseteq H and v  S setminus H\n\nAlgorithm\n\nS  H iff operatornameihull(S)  H, where  operatornameihull is the interval hull operator.\n\n\n\nis_subset(B::Union{Ball2{N}, Ballp{N}},\n          S::AbstractSingleton{N},\n          [witness]::Bool=false\n         )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a ball in the 2-norm or p-norm is contained in a set with a single value, and if not, optionally compute a witness.\n\nInput\n\nB – inner ball in the 2-norm or p-norm\nS – outer set with a single value\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B  S\nIf witness option is activated:\n(true, []) iff B  S\n(false, v) iff B notsubseteq S and v  B setminus S\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Subset-check-1",
    "page": "Binary Functions on Sets",
    "title": "Subset check",
    "category": "section",
    "text": "⊆\nis_subset(::LazySet{Float64}, ::AbstractHyperrectangle{Float64})\nis_subset(::AbstractPolytope{Float64}, ::AbstractHyperrectangle{Float64})\nis_subset(::AbstractHyperrectangle{Float64}, ::AbstractHyperrectangle{Float64})\nis_subset(::AbstractPolytope{Float64}, ::LazySet{Float64})\nis_subset(::AbstractSingleton{Float64}, ::LazySet{Float64})\nis_subset(::AbstractSingleton{Float64}, ::AbstractHyperrectangle{Float64})\nis_subset(::AbstractSingleton{Float64}, ::AbstractSingleton{Float64})\nis_subset(::Ball2{Float64}, ::Ball2{Float64})\nis_subset(::Ball2{Float64}, ::AbstractSingleton{Float64})"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.AbstractHyperrectangle{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(H1::AbstractHyperrectangle{N},\n                      H2::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two hyperrectangles do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2 = \nIf witness option is activated:\n(true, []) iff H1  H2 = \n(false, v) iff H1  H2   and v  H1  H2\n\nAlgorithm\n\nH1  H2   iff c_2 - c_1  r_1 + r_2, where  is taken component-wise.\n\nA witness is computed by starting in one center and moving toward the other center for as long as the minimum of the radius and the center distance. In other words, the witness is the point in H1 that is closest to the center of H2.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.AbstractSingleton{Float64},LazySets.AbstractHyperrectangle{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(H1::AbstractHyperrectangle{N},\n                      H2::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two hyperrectangles do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2 = \nIf witness option is activated:\n(true, []) iff H1  H2 = \n(false, v) iff H1  H2   and v  H1  H2\n\nAlgorithm\n\nH1  H2   iff c_2 - c_1  r_1 + r_2, where  is taken component-wise.\n\nA witness is computed by starting in one center and moving toward the other center for as long as the minimum of the radius and the center distance. In other words, the witness is the point in H1 that is closest to the center of H2.\n\n\n\nis_intersection_empty(S::AbstractSingleton{N},\n                      set::LazySet{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a singleton and a convex set do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS   – singleton\nset – convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\nis_intersection_empty(S::AbstractSingleton{N},\n                      H::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a singleton and a hyperrectangle do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS – singleton\nH – hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  S = \nIf witness option is activated:\n(true, []) iff H  S = \n(false, v) iff H  S   and v = element(S)  H  S\n\nAlgorithm\n\nS  H =  iff element(S) otin H.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.AbstractHyperrectangle{Float64},LazySets.AbstractSingleton{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(H1::AbstractHyperrectangle{N},\n                      H2::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two hyperrectangles do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2 = \nIf witness option is activated:\n(true, []) iff H1  H2 = \n(false, v) iff H1  H2   and v  H1  H2\n\nAlgorithm\n\nH1  H2   iff c_2 - c_1  r_1 + r_2, where  is taken component-wise.\n\nA witness is computed by starting in one center and moving toward the other center for as long as the minimum of the radius and the center distance. In other words, the witness is the point in H1 that is closest to the center of H2.\n\n\n\nis_intersection_empty(set::LazySet{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a convex set and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nset – convex set\nS   – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\nis_intersection_empty(H::AbstractHyperrectangle{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a hyperrectangle and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH – hyperrectangle\nS – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  S = \nIf witness option is activated:\n(true, []) iff H  S = \n(false, v) iff H  S   and v = element(S)  H  S\n\nAlgorithm\n\nH  S =  iff element(S) otin H.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.AbstractSingleton{Float64},LazySets.LazySet{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(S::AbstractSingleton{N},\n                      set::LazySet{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a singleton and a convex set do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS   – singleton\nset – convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.LazySet{Float64},LazySets.AbstractSingleton{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(set::LazySet{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a convex set and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nset – convex set\nS   – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.AbstractSingleton{Float64},LazySets.AbstractSingleton{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(H1::AbstractHyperrectangle{N},\n                      H2::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two hyperrectangles do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH1 – first hyperrectangle\nH2 – second hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H1  H2 = \nIf witness option is activated:\n(true, []) iff H1  H2 = \n(false, v) iff H1  H2   and v  H1  H2\n\nAlgorithm\n\nH1  H2   iff c_2 - c_1  r_1 + r_2, where  is taken component-wise.\n\nA witness is computed by starting in one center and moving toward the other center for as long as the minimum of the radius and the center distance. In other words, the witness is the point in H1 that is closest to the center of H2.\n\n\n\nis_intersection_empty(S::AbstractSingleton{N},\n                      set::LazySet{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a singleton and a convex set do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS   – singleton\nset – convex set\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\nis_intersection_empty(set::LazySet{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a convex set and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nset – convex set\nS   – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S  operatornameset = \nIf witness option is activated:\n(true, []) iff S  operatornameset = \n(false, v) iff S  operatornameset   and v = element(S)  S  operatornameset\n\nAlgorithm\n\nS  operatornameset =  iff element(S) otin operatornameset.\n\n\n\nis_intersection_empty(S1::AbstractSingleton{N},\n                      S2::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two singletons do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS1 – first singleton\nS2 – second singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff S1  S2 = \nIf witness option is activated:\n(true, []) iff S1  S2 = \n(false, v) iff S1  S2   and v = element(S1)  S1  S2\n\nAlgorithm\n\nS1  S2 =  iff S1  S2.\n\n\n\nis_intersection_empty(H::AbstractHyperrectangle{N},\n                      S::AbstractSingleton{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a hyperrectangle and a singleton do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH – hyperrectangle\nS – singleton\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  S = \nIf witness option is activated:\n(true, []) iff H  S = \n(false, v) iff H  S   and v = element(S)  H  S\n\nAlgorithm\n\nH  S =  iff element(S) otin H.\n\n\n\nis_intersection_empty(S::AbstractSingleton{N},\n                      H::AbstractHyperrectangle{N},\n                      witness::Bool=false\n                     )::Union{Bool,Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether a singleton and a hyperrectangle do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nS – singleton\nH – hyperrectangle\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  S = \nIf witness option is activated:\n(true, []) iff H  S = \n(false, v) iff H  S   and v = element(S)  H  S\n\nAlgorithm\n\nS  H =  iff element(S) otin H.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.Zonotope{Float64},LazySets.Hyperplane{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(Z::Zonotope{N}, H::Hyperplane{N}, witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a zonotope and a hyperplane do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nZ – zonotope\nH – hyperplane\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff Z  H = \nIf witness option is activated:\n(true, []) iff Z  H = \n(false, v) iff Z  H   and v  Z  H\n\nAlgorithm\n\nZ  H =  iff (b - ac)  otin left pm _i=1^p ag_i  ight, where a, b are the hyperplane coefficients, c is the zonotope\'s center, and g_i are the zonotope\'s generators.\n\nNotes\n\nWitness production is currently not supported.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.Hyperplane{Float64},LazySets.Zonotope{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(H::Hyperplane{N}, Z::Zonotope{N}, witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether a hyperplane and a zonotope do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nH – hyperplane\nZ – zonotope\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff H  Z = \nIf witness option is activated:\n(true, []) iff H  Z = \n(false, v) iff H  Z   and v  H  Z\n\nAlgorithm\n\nH  Z =  iff (b - ac)  otin left pm _i=1^p ag_i  ight, where a, b are the hyperplane coefficients, c is the zonotope\'s center, and g_i are the zonotope\'s generators.\n\nNotes\n\nWitness production is currently not supported.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.Ball2{Float64},LazySets.Ball2{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(B1::Ball2{N},\n                      B2::Ball2{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool,Vector{N}}} where {N<:Real}\n\nCheck whether two balls in the 2-norm do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nB1 – first ball in the 2-norm\nB2 – second ball in the 2-norm\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff B1  B2 = \nIf witness option is activated:\n(true, []) iff B1  B2 = \n(false, v) iff B1  B2   and v  B1  B2\n\nAlgorithm\n\nB1  B2 =  iff  c_2 - c_1 _2  r_1 + r_2.\n\nA witness is computed depending on the smaller/bigger ball (to break ties, choose B1 for the smaller ball) as follows.\n\nIf the smaller ball\'s center is contained in the bigger ball, we return it.\nOtherwise start in the smaller ball\'s center and move toward the other center until hitting the smaller ball\'s border. In other words, the witness is the point in the smaller ball that is closest to the center of the bigger ball.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#LazySets.is_intersection_empty-Tuple{LazySets.LineSegment{Float64},LazySets.LineSegment{Float64}}",
    "page": "Binary Functions on Sets",
    "title": "LazySets.is_intersection_empty",
    "category": "Method",
    "text": "is_intersection_empty(ls1::LineSegment{N},\n                      ls2::LineSegment{N},\n                      witness::Bool=false\n                     )::Union{Bool, Tuple{Bool, Vector{N}}} where {N<:Real}\n\nCheck whether two line segments do not intersect, and otherwise optionally compute a witness.\n\nInput\n\nls1 – first line segment\nls2 – second line segment\nwitness – (optional, default: false) compute a witness if activated\n\nOutput\n\nIf witness option is deactivated: true iff ls1  ls2 = \nIf witness option is activated:\n(true, []) iff ls1  ls2 = \n(false, v) iff ls1  ls2   and v  ls1  ls2\n\nAlgorithm\n\nThe algorithm is inspired from here, which again is the special 2D case of a 3D algorithm by Ronald Goldman\'s article on the Intersection of two lines in three-space in Graphics Gems, Andrew S. (ed.), 1990.\n\nWe first check if the two line segments are parallel, and if so, if they are collinear. In the latter case, we check containment of any of the end points in the other line segment. Otherwise the lines are not parallel, so we can solve an equation of the intersection point, if it exists.\n\n\n\n"
},

{
    "location": "lib/binary_functions.html#Check-for-emptiness-of-intersection-1",
    "page": "Binary Functions on Sets",
    "title": "Check for emptiness of intersection",
    "category": "section",
    "text": "is_intersection_empty(::AbstractHyperrectangle{Float64}, ::AbstractHyperrectangle{Float64})\nis_intersection_empty(::AbstractSingleton{Float64}, ::AbstractHyperrectangle{Float64})\nis_intersection_empty(::AbstractHyperrectangle{Float64}, ::AbstractSingleton{Float64})\nis_intersection_empty(::AbstractSingleton{Float64}, ::LazySet{Float64})\nis_intersection_empty(::LazySet{Float64}, ::AbstractSingleton{Float64})\nis_intersection_empty(::AbstractSingleton{Float64}, ::AbstractSingleton{Float64})\nis_intersection_empty(::Zonotope{Float64}, ::Hyperplane{Float64})\nis_intersection_empty(::Hyperplane{Float64}, ::Zonotope{Float64})\nis_intersection_empty(::Ball2{Float64}, ::Ball2{Float64})\nis_intersection_empty(::LineSegment{Float64}, ::LineSegment{Float64})"
},

{
    "location": "lib/approximations.html#",
    "page": "Approximations",
    "title": "Approximations",
    "category": "page",
    "text": ""
},

{
    "location": "lib/approximations.html#LazySets.Approximations",
    "page": "Approximations",
    "title": "LazySets.Approximations",
    "category": "Module",
    "text": "Module Approximations.jl – polygonal approximation of convex sets through support vectors.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Approximations-1",
    "page": "Approximations",
    "title": "Approximations",
    "category": "section",
    "text": "This section of the manual describes the Cartesian decomposition algorithms and the approximation of high-dimensional convex sets using projections.Pages = [\"approximations.md\"]\nDepth = 3CurrentModule = LazySets.Approximations\nDocTestSetup = quote\n    using LazySets, LazySets.Approximations\nendApproximations"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.decompose",
    "page": "Approximations",
    "title": "LazySets.Approximations.decompose",
    "category": "Function",
    "text": "decompose(S::LazySet{N}, set_type::Type=HPolygon\n         )::CartesianProductArray where {N<:Real}\n\nCompute an overapproximation of the projections of the given convex set over each two-dimensional subspace.\n\nInput\n\nS – convex set\nset_type – (optional, default: HPolygon) type of set approximation in 2D\n\nOutput\n\nA CartesianProductArray corresponding to the Cartesian product of two-dimensional sets of type set_type.\n\nAlgorithm\n\nFor each 2D block a specific decompose_2D method is called, dispatched on the set_type argument.\n\n\n\ndecompose(S::LazySet{N}, ɛi::Vector{<:Real})::CartesianProductArray where {N<:Real}\n\nCompute an overapproximation of the projections of the given convex set over each two-dimensional subspace with a certified error bound.\n\nInput\n\nS  – convex set\nɛi – array with the error bound for each projection (different error bounds         can be passed for different blocks)\n\nOutput\n\nA CartesianProductArray corresponding to the Cartesian product of 2  2 polygons.\n\nAlgorithm\n\nThis algorithm assumes a decomposition into two-dimensional subspaces only, i.e., partitions of the form 2 2  2. In particular, if S is a CartesianProductArray, no check is performed to verify that assumption.\n\nThe algorithm proceeds as follows:\n\nProject the set S into each partition, with M⋅S, where M is the identity matrix in the block coordinates and zero otherwise.\nOverapproximate the set with a given error bound, ɛi[i], for i = 1  b,\nReturn the result as a CartesianProductArray.\n\n\n\ndecompose(S::LazySet, ɛ::Real, [set_type]::Type=HPolygon\n         )::CartesianProductArray\n\nCompute an overapproximation of the projections of the given convex set over each two-dimensional subspace with a certified error bound.\n\nInput\n\nS – convex set\nɛ –  error bound\nset_type – (optional, default: HPolygon) type of set approximation in 2D\n\nOutput\n\nA CartesianProductArray corresponding to the Cartesian product of two-dimensional sets of type set_type.\n\nNotes\n\nThis function is a particular case of decompose(S, ɛi), where the same error bound for each block is assumed.\n\nThe set_type argument is ignored if   textInf.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Cartesian-Decomposition-1",
    "page": "Approximations",
    "title": "Cartesian Decomposition",
    "category": "section",
    "text": "decompose"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.overapproximate",
    "page": "Approximations",
    "title": "LazySets.Approximations.overapproximate",
    "category": "Function",
    "text": "overapproximate(S::LazySet{N}, ::Type{<:HPolygon})::HPolygon where {N<:Real}\n\nReturn an approximation of a given 2D convex set as a box-shaped polygon.\n\nInput\n\nS – convex set, assumed to be two-dimensional\nHPolygon for dispatch\n\nOutput\n\nA box-shaped polygon in constraint representation.\n\n\n\noverapproximate(S::LazySet)::HPolygon\n\nAlias for overapproximate(S, HPolygon).\n\n\n\noverapproximate(S::LazySet, Type{<:Hyperrectangle})::Hyperrectangle\n\nReturn an approximation of a given 2D convex set as a hyperrectangle.\n\nInput\n\nS – convex set, assumed to be two-dimensional\nHyperrectangle for dispatch\n\nOutput\n\nA hyperrectangle.\n\n\n\noverapproximate(S::LazySet, ɛ::Real)::HPolygon\n\nReturn an ɛ-close approximation of the given 2D set (in terms of Hausdorff distance) as a polygon.\n\nInput\n\nS – convex set, assumed to be two-dimensional\nɛ – error bound\n\nOutput\n\nA polygon in constraint representation.\n\n\n\noverapproximate(S::ConvexHull{N, Zonotope{N}, Zonotope{N}},\n                 ::Type{<:Zonotope})::Zonotope where {N<:Real}\n\nOverapproximate the convex hull of two zonotopes.\n\nInput\n\nS – convex hull of two zonotopes of the same order\nZonotope for dispatch\n\nAlgorithm\n\nThis function implements the method proposed in Reachability of Uncertain Linear Systems Using Zonotopes, A. Girard, HSCC 2005. The convex hull of two zonotopes of the same order, that we write Z_j = c^(j) g^(j)_1  g^(j)_p for j = 1 2, can be overapproximated as follows:\n\nCH(Z_1 Z_2)  frac12c^(1)+c^(2) g^(1)_1+g^(2)_1  g^(1)_p+g^(2)_p c^(1)-c^(2) g^(1)_1-g^(2)_1  g^(1)_p-g^(2)_p\n\nIt should be noted that the output zonotope is not necessarily the minimal enclosing zonotope, which is in general expensive in high dimensions. This is further investigated in: Zonotopes as bounding volumes, L. J. Guibas et al, Proc. of Symposium on Discrete Algorithms, pp. 803-812.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Overapproximations-1",
    "page": "Approximations",
    "title": "Overapproximations",
    "category": "section",
    "text": "overapproximate"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.ballinf_approximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.ballinf_approximation",
    "category": "Function",
    "text": "ballinf_approximation(S::LazySet{N})::BallInf{N} where {N<:Real}\n\nOverapproximate a convex set by a tight ball in the infinity norm.\n\nInput\n\nS – convex set\n\nOutput\n\nA tight ball in the infinity norm.\n\nAlgorithm\n\nThe center and radius of the box are obtained by evaluating the support function of the given convex set along the canonical directions.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation",
    "category": "Function",
    "text": "box_approximation(S::LazySet)::Hyperrectangle\n\nOverapproximate a convex set by a tight hyperrectangle.\n\nInput\n\nS – convex set\n\nOutput\n\nA tight hyperrectangle.\n\nAlgorithm\n\nThe center of the hyperrectangle is obtained by averaging the support function of the given set in the canonical directions, and the lengths of the sides can be recovered from the distance among support functions in the same directions.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.interval_hull",
    "page": "Approximations",
    "title": "LazySets.Approximations.interval_hull",
    "category": "Function",
    "text": "interval_hull\n\nAlias for box_approximation.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation_symmetric",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation_symmetric",
    "category": "Function",
    "text": "box_approximation_symmetric(S::LazySet{N})::Hyperrectangle{N} where {N<:Real}\n\nOverapproximate a convex set by a tight hyperrectangle centered in the origin.\n\nInput\n\nS – convex set\n\nOutput\n\nA tight hyperrectangle centered in the origin.\n\nAlgorithm\n\nThe center of the box is the origin, and the radius is obtained by computing the maximum value of the support function evaluated at the canonical directions.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.symmetric_interval_hull",
    "page": "Approximations",
    "title": "LazySets.Approximations.symmetric_interval_hull",
    "category": "Function",
    "text": "symmetric_interval_hull\n\nAlias for box_approximation_symmetric.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.box_approximation_helper",
    "page": "Approximations",
    "title": "LazySets.Approximations.box_approximation_helper",
    "category": "Function",
    "text": "box_approximation_helper(S::LazySet)\n\nCommon code of box_approximation and box_approximation_symmetric.\n\nInput\n\nS – convex set\n\nOutput\n\nA tuple containing the data that is needed to construct a tightly overapproximating hyperrectangle.\n\nc – center\nr – radius\n\nAlgorithm\n\nThe center of the hyperrectangle is obtained by averaging the support function of the given convex set in the canonical directions. The lengths of the sides can be recovered from the distance among support functions in the same directions.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Box-Approximations-1",
    "page": "Approximations",
    "title": "Box Approximations",
    "category": "section",
    "text": "ballinf_approximation\nbox_approximation\ninterval_hull\nbox_approximation_symmetric\nsymmetric_interval_hull\nbox_approximation_helper"
},

{
    "location": "lib/approximations.html#Base.LinAlg.norm-Tuple{LazySets.LazySet,Real}",
    "page": "Approximations",
    "title": "Base.LinAlg.norm",
    "category": "Method",
    "text": "norm(S::LazySet, [p]::Real=Inf)\n\nReturn the norm of a convex set. It is the norm of the enclosing ball (of the given p-norm) of minimal volume that is centered in the origin.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the norm.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.radius-Tuple{LazySets.LazySet,Real}",
    "page": "Approximations",
    "title": "LazySets.radius",
    "category": "Method",
    "text": "radius(S::LazySet, [p]::Real=Inf)\n\nReturn the radius of a convex set. It is the radius of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the radius.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.diameter-Tuple{LazySets.LazySet,Real}",
    "page": "Approximations",
    "title": "LazySets.diameter",
    "category": "Method",
    "text": "diameter(S::LazySet, [p]::Real=Inf)\n\nReturn the diameter of a convex set. It is the maximum distance between any two elements of the set, or, equivalently, the diameter of the enclosing ball (of the given p-norm) of minimal volume with the same center.\n\nInput\n\nS – convex set\np – (optional, default: Inf) norm\n\nOutput\n\nA real number representing the diameter.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Metric-properties-of-sets-1",
    "page": "Approximations",
    "title": "Metric properties of sets",
    "category": "section",
    "text": "norm(::LazySet, ::Real)\nradius(::LazySet, ::Real)\ndiameter(::LazySet, ::Real)"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.LocalApproximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.LocalApproximation",
    "category": "Type",
    "text": "LocalApproximation{N<:Real}\n\nType that represents a local approximation in 2D.\n\nFields\n\np1         – first inner point\nd1         – first direction\np2         – second inner point\nd2         – second direction\nq          – intersection of the lines l1 ⟂ d1 at p1 and l2 ⟂ d2 at p2\nrefinable  – states if this approximation is refinable\nerr        – error upper bound\n\nNotes\n\nThe criteria for refinable are determined in the method new_approx.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.PolygonalOverapproximation",
    "page": "Approximations",
    "title": "LazySets.Approximations.PolygonalOverapproximation",
    "category": "Type",
    "text": "PolygonalOverapproximation{N<:Real}\n\nType that represents the polygonal approximation of a convex set.\n\nFields\n\nS           – convex set\napprox_list – vector of local approximations\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.new_approx-Tuple{LazySets.LazySet,Array{Float64,1},Array{Float64,1},Array{Float64,1},Array{Float64,1}}",
    "page": "Approximations",
    "title": "LazySets.Approximations.new_approx",
    "category": "Method",
    "text": "new_approx(S::LazySet, p1::Vector{N}, d1::Vector{N}, p2::Vector{N},\n           d2::Vector{N}) where {N<:Real}\n\nInput\n\nS          – convex set\np1         – first inner point\nd1         – first direction\np2         – second inner point\nd2         – second direction\n\nOutput\n\nA local approximation of S in the given directions.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.addapproximation!-Tuple{LazySets.Approximations.PolygonalOverapproximation,Array{Float64,1},Array{Float64,1},Array{Float64,1},Array{Float64,1}}",
    "page": "Approximations",
    "title": "LazySets.Approximations.addapproximation!",
    "category": "Method",
    "text": "addapproximation!(Ω::PolygonalOverapproximation,\n    p1::Vector{N}, d1::Vector{N}, p2::Vector{N}, d2::Vector{N}) where {N<:Real}\n\nInput\n\nΩ          – polygonal overapproximation of a convex set\np1         – first inner point\nd1         – first direction\np2         – second inner point\nd2         – second direction\n\nOutput\n\nThe list of local approximations in Ω of the set Ω.S is updated in-place and the new approximation is returned by this function.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.refine-Tuple{LazySets.Approximations.PolygonalOverapproximation,Int64}",
    "page": "Approximations",
    "title": "LazySets.Approximations.refine",
    "category": "Method",
    "text": "refine(Ω::PolygonalOverapproximation, i::Int)::Tuple{LocalApproximation, LocalApproximation}\n\nRefine a given local approximation of the polygonal approximation of a convex set, by splitting along the normal direction to the approximation.\n\nInput\n\nΩ   – polygonal overapproximation of a convex set\ni   – integer index for the local approximation to be refined\n\nOutput\n\nThe tuple consisting of the refined right and left local approximations.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.tohrep-Tuple{LazySets.Approximations.PolygonalOverapproximation}",
    "page": "Approximations",
    "title": "LazySets.Approximations.tohrep",
    "category": "Method",
    "text": "tohrep(Ω::PolygonalOverapproximation{N})::AbstractHPolygon where {N<:Real}\n\nConvert a polygonal overapproximation into a concrete polygon.\n\nInput\n\nΩ   – polygonal overapproximation of a convex set\n\nOutput\n\nA polygon in constraint representation.\n\n\n\n"
},

{
    "location": "lib/approximations.html#LazySets.Approximations.approximate-Tuple{LazySets.LazySet{Float64},Float64}",
    "page": "Approximations",
    "title": "LazySets.Approximations.approximate",
    "category": "Method",
    "text": "approximate(S::LazySet{N},\n            ɛ::N)::PolygonalOverapproximation{N} where {N<:Real}\n\nReturn an ɛ-close approximation of the given 2D convex set (in terms of Hausdorff distance) as an inner and an outer approximation composed by sorted local Approximation2D.\n\nInput\n\nS – 2D convex set\nɛ – error bound\n\nOutput\n\nAn ɛ-close approximation of the given 2D convex set.\n\n\n\n"
},

{
    "location": "lib/approximations.html#Iterative-refinement-1",
    "page": "Approximations",
    "title": "Iterative refinement",
    "category": "section",
    "text": "LocalApproximation\nPolygonalOverapproximation\nnew_approx(::LazySet, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64})\naddapproximation!(::PolygonalOverapproximation, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64}, ::Vector{Float64})\nrefine(::PolygonalOverapproximation, ::Int)\ntohrep(::PolygonalOverapproximation)\napproximate(::LazySet{Float64}, ::Float64)See Iterative Refinement for more details."
},

{
    "location": "lib/utils.html#",
    "page": "Utility Functions",
    "title": "Utility Functions",
    "category": "page",
    "text": "CurrentModule = LazySets\nDocTestSetup = quote\n    using LazySets\nend"
},

{
    "location": "lib/utils.html#LazySets.sign_cadlag",
    "page": "Utility Functions",
    "title": "LazySets.sign_cadlag",
    "category": "Function",
    "text": "sign_cadlag(x::N)::N where {N<:Real}\n\nThis function works like the sign function but is 1 for input 0.\n\nInput\n\nx – real scalar\n\nOutput\n\n1 if x  0, -1 otherwise.\n\nNotes\n\nThis is the sign function right-continuous at zero (see càdlàg function). It can be used with vector-valued arguments via the dot operator.\n\nExamples\n\njulia> import LazySets.sign_cadlag\n\njulia> sign_cadlag.([-0.6, 1.3, 0.0])\n3-element Array{Float64,1}:\n -1.0\n  1.0\n  1.0\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@neutral",
    "page": "Utility Functions",
    "title": "LazySets.@neutral",
    "category": "Macro",
    "text": "@neutral(SET, NEUT)\n\nCreate functions to make a set type behave commutative with a given neutral element set type.\n\nInput\n\nSET  – set type\nNEUT – set type for neutral element\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates four functions (possibly two more if @neutral has been used in advance) (possibly two or four more if @declare_array_version has been used in advance).\n\nExamples\n\n@neutral(MinkowskiSum, N) creates at least the following functions:\n\nneutral(::MinkowskiSum) = N\nMinkowskiSum(X, N) = X\nMinkowskiSum(N, X) = X\nMinkowskiSum(N, N) = N\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@absorbing",
    "category": "Macro",
    "text": "@absorbing(SET, ABS)\n\nCreate functions to make a set type behave commutative with a given absorbing element set type.\n\nInput\n\nSET – set type\nABS – set type for absorbing element\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates four functions (possibly two more if @absorbing has been used in advance) (possibly two or four more if @declare_array_version has been used in advance).\n\nExamples\n\n@absorbing(MinkowskiSum, A) creates at least the following functions:\n\nabsorbing(::MinkowskiSum) = A\nMinkowskiSum(X, A) = A\nMinkowskiSum(A, X) = A\nMinkowskiSum(A, A) = A\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@declare_array_version",
    "page": "Utility Functions",
    "title": "LazySets.@declare_array_version",
    "category": "Macro",
    "text": "@declare_array_version(SET, SETARR)\n\nCreate functions to connect a set type with its array set type.\n\nInput\n\nSET    – set type\nSETARR – array set type\n\nOutput\n\nNothing.\n\nNotes\n\nThis macro generates eight functions (and possibly up to eight more if @neutral/@absorbing has been used in advance for the base and/or array set type).\n\nExamples\n\n@declare_array_version(MinkowskiSum, MinkowskiSumArray) creates at least the following functions:\n\narray_constructor(::MinkowskiSum) = MinkowskiSumArray\nis_array_constructor(::MinkowskiSumArray) = true\nMinkowskiSum(X, arr) = MinkowskiSum(X, arr)\nMinkowskiSum(arr, X) = MinkowskiSum(arr, X)\nMinkowskiSum(arr1, arr2) = MinkowskiSum(arr1, arr2)\n\n\n\n"
},

{
    "location": "lib/utils.html#Utility-functions-1",
    "page": "Utility Functions",
    "title": "Utility functions",
    "category": "section",
    "text": "sign_cadlag\n@neutral\n@absorbing\n@declare_array_version"
},

{
    "location": "lib/utils.html#LazySets.@neutral_absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@neutral_absorbing",
    "category": "Macro",
    "text": "@neutral_absorbing(SET, NEUT, ABS)\n\nCreate two functions to avoid method ambiguties for a set type with respect to neutral and absorbing element set types.\n\nInput\n\nSET  – set type\nNEUT – set type for neutral element\nABS  – set type for absorbing element\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@neutral_absorbing(MinkowskiSum, N, A) creates the following functions as quoted expressions:\n\nMinkowskiSum(N, A) = A\nMinkowskiSum(A, N) = A\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@array_neutral",
    "page": "Utility Functions",
    "title": "LazySets.@array_neutral",
    "category": "Macro",
    "text": "@array_neutral(FUN, NEUT, SETARR)\n\nCreate two functions to avoid method ambiguities for a set type with respect to the neutral element set type and the array set type.\n\nInput\n\nFUN     – function name\nNEUT    – set type for neutral element\nSETARR  – array set type\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@array_neutral(MinkowskiSum, N, ARR) creates the following functions as quoted expressions:\n\nMinkowskiSum(N, ARR) = ARR\nMinkowskiSum(ARR, N) = ARR\n\n\n\n"
},

{
    "location": "lib/utils.html#LazySets.@array_absorbing",
    "page": "Utility Functions",
    "title": "LazySets.@array_absorbing",
    "category": "Macro",
    "text": "@array_absorbing(FUN, ABS, SETARR)\n\nCreate two functions to avoid method ambiguities for a set type with respect to the absorbing element set type and the array set type.\n\nInput\n\nFUN     – function name\nABS     – set type for absorbing element\nSETARR  – array set type\n\nOutput\n\nA quoted expression containing the function definitions.\n\nExamples\n\n@array_absorbing(MinkowskiSum, ABS, ARR) creates the following functions as quoted expressions:\n\nMinkowskiSum(ABS, ARR) = ABS\nMinkowskiSum(ARR, ABS) = ABS\n\n\n\n"
},

{
    "location": "lib/utils.html#Helper-functions-for-internal-use-only-1",
    "page": "Utility Functions",
    "title": "Helper functions for internal use only",
    "category": "section",
    "text": "@neutral_absorbing\n@array_neutral\n@array_absorbing"
},

{
    "location": "about.html#",
    "page": "About",
    "title": "About",
    "category": "page",
    "text": ""
},

{
    "location": "about.html#About-1",
    "page": "About",
    "title": "About",
    "category": "section",
    "text": "This page contains some general information about this project, and recommendations about contributing.Pages = [\"about.md\"]"
},

{
    "location": "about.html#Contributing-1",
    "page": "About",
    "title": "Contributing",
    "category": "section",
    "text": "If you like this package, consider contributing! You can send bug reports (or fix them and send your code), add examples to the documentation, or propose new features.Below some conventions that we follow when contributing to this package are detailed. For specific guidelines on documentation, see the Documentations Guidelines wiki."
},

{
    "location": "about.html#Branches-and-pull-requests-(PR)-1",
    "page": "About",
    "title": "Branches and pull requests (PR)",
    "category": "section",
    "text": "We use a standard pull request policy: You work in a private branch and eventually add a pull request, which is then reviewed by other programmers and merged into the master branch.Each pull request should be pushed in a new branch with the name of the author followed by a descriptive name, e.g., mforets/my_feature. If the branch is associated to a previous discussion in one issue, we use the name of the issue for easier lookup, e.g., mforets/7."
},

{
    "location": "about.html#Unit-testing-and-continuous-integration-(CI)-1",
    "page": "About",
    "title": "Unit testing and continuous integration (CI)",
    "category": "section",
    "text": "This project is synchronized with Travis CI such that each PR gets tested before merging (and the build is automatically triggered after each new commit). For the maintainability of this project, it is important to understand and fix the failing doctests if they exist. We develop in Julia v0.6.0, but for experimentation we also build on the nightly branch.When you modify code in this package, you should make sure that all unit tests pass. To run the unit tests locally, you should do:$ julia --color=yes test/runtests.jlAlternatively, you can achieve the same from inside the REPL using the following command:julia> Pkg.test(\"LazySets\")We also advise adding new unit tests when adding new features to ensure long-term support of your contributions."
},

{
    "location": "about.html#Contributing-to-the-documentation-1",
    "page": "About",
    "title": "Contributing to the documentation",
    "category": "section",
    "text": "New functions and types should be documented according to our guidelines directly in the source code.You can view the source code documentation from inside the REPL by typing ? followed by the name of the type or function. For example, the following command will print the documentation of the LazySet type:julia> ?LazySetThis documentation you are currently reading is written in Markdown, and it relies on Documenter.jl to produce the HTML layout. The sources for creating this documentation are found in docs/src. You can easily include the documentation that you wrote for your functions or types there (see the Documenter.jl guide or our sources for examples).To generate the documentation locally, run make.jl, e.g., by executing the following command in the terminal:$ julia --color=yes docs/make.jlNote that this also runs all doctests which will take some time."
},

{
    "location": "about.html#Related-projects-1",
    "page": "About",
    "title": "Related projects",
    "category": "section",
    "text": "The project 3PLIB is a Java Library developed by Frédéric Viry, and it is one of the previous works that led to the creation of LazySets.jl. 3PLIB is specialized to planar projections of convex polyhedra. It was initially created to embed this feature in Java applications, and also provides a backend for visualization of high-dimensional reach set approximations computed with SpaceEx."
},

{
    "location": "about.html#Credits-1",
    "page": "About",
    "title": "Credits",
    "category": "section",
    "text": "These persons have contributed to LazySets.jl (in alphabetic order):Marcelo Forets\nChristian Schilling\nFrédéric ViryWe are also grateful to Goran Frehse for enlightening discussions."
},

]}
